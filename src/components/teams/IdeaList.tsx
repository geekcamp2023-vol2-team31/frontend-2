import React, { FC, useEffect, useState } from 'react';
import IdeaListItem from './IdeaListItem';
import classes from './IdeaList.module.css';

interface IIdeaListProps {
  id: string;
  label: string;
  leftStyle: 'circle' | 'triangle'; // 子要素の全てのIdeaListItemのleftStyle
  rightStyle: 'circle' | 'triangle'; // 子要素の全てのIdeaListItemのrightStyle
  items: {
    id: string;
    value: string;
  }[];
  onChangeItemsHeight?: (event: IIdeaListChangeItemsHeightEvent) => void;
}

interface IIdeaListChangeItemsHeightEvent {
  id: string;
  items: {
    id: string;
    height: number;
    offsetY: number;
  }[];
}

// 要素の位置と大きさを表す型
interface IItemHeight {
  id: string;
  height: number;
}

// IdeaListの上端から最初のIdeaListItemまでの垂直方向の長さ 単位px
// cssと合わせる必要がある
// cardのpadding + headingの高さ + headingのmargin-bottom
const offsetYOfFirstItem = 14 + 24 + 12;

// IdeaListItem間のマージン 単位: px
const itemMargin = 8; 

const IdeaList: FC<IIdeaListProps> = ({ id, label, leftStyle, rightStyle, items, onChangeItemsHeight }) => {
  const [itemHeights, setItemHeights] = useState<IItemHeight[]>(
    // 初期値は全idにheight: 0を割り当てる。
    items.map(item => ({ id: item.id, height: 0 }))
  );

  // 子要素の高さが変わったときにonChangeItemsHeightを呼び出す
  useEffect(() => {
    if (onChangeItemsHeight) {
      const resultItems: {
        id: string, height: number, offsetY: number
      }[] = [];

      let offsetY = offsetYOfFirstItem;
      itemHeights.forEach(item => {
        resultItems.push({
          ...item,
          offsetY,
        });
        offsetY += item.height + itemMargin;
      });

      onChangeItemsHeight({ id, items: resultItems });
    }
  }, [id, itemHeights, onChangeItemsHeight]);

  const handleChangeHeight = ({ id, height }: {id: string, height: number}) => {
    setItemHeights(itemHeights => {
      // 該当のitemの高さを更新する
      const nextItemHeights = itemHeights.map(item => {
        if (item.id === id) { return { id, height }}
        else { return item }
      });
      return nextItemHeights;
    });
  }

  return (
    <section className={classes.card}>
      <h2 className={classes.heading}>{label}</h2>
      <div className={classes['children-container']}>
        {
          items.map(item => (
            <IdeaListItem
              key={item.id}
              {...item}
              leftStyle={leftStyle}
              rightStyle={rightStyle}
              onChangeHeight={handleChangeHeight}
            />
          ))
        }
      </div>
    </section>
  );
};

export default IdeaList;