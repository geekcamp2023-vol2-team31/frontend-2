import React, { FC, useEffect, useState } from "react";
import IdeaListItem, {
  IIdeaListItemChangeCheckboxEvent,
  IIdeaListItemClickConnectorEvent,
  IIdeaListItemEnterEvent,
} from "./IdeaListItem";
import classes from "./IdeaList.module.css";
import { ReactSortable } from "react-sortablejs";

interface IIdeaListProps {
  id: string;
  label: string;
  leftStyle: "circle" | "triangle"; // 子要素の全てのIdeaListItemのleftStyle
  rightStyle: "circle" | "triangle"; // 子要素の全てのIdeaListItemのrightStyle
  items: {
    id: string;
    value: string;
    checkboxValue?: boolean;
    emphasized?: boolean;
    onEnter?: (event: IIdeaListItemEnterEvent) => void;
    onClickConnector?: (event: IIdeaListItemClickConnectorEvent) => void;
    onChangeCheckbox?: (event: IIdeaListItemChangeCheckboxEvent) => void;
  }[];
  onChangeItemsHeight?: (event: IIdeaListChangeItemsHeightEvent) => void;
  onChangeItems?: (event: IIdeaListChangeItemsEvent) => void;
}

export interface IIdeaListChangeItemsHeightEvent {
  id: string;
  items: {
    id: string;
    height: number;
    offsetY: number;
  }[];
}

interface IIdeaListChangeItemsEvent {
  id: string;
  items: {
    id: string;
    value: string;
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

const IdeaList: FC<IIdeaListProps> = ({
  id,
  label,
  leftStyle,
  rightStyle,
  items,
  onChangeItemsHeight,
  onChangeItems,
}) => {
  const [itemHeights, setItemHeights] = useState<IItemHeight[]>(
    // 初期値は全idにheight: 0を割り当てる。
    items.map((item) => ({ id: item.id, height: 0 }))
  );

  // 子要素の高さが変わったときにonChangeItemsHeightを呼び出す
  useEffect(() => {
    if (onChangeItemsHeight) {
      const resultItems: {
        id: string;
        height: number;
        offsetY: number;
      }[] = [];

      let offsetY = offsetYOfFirstItem;
      itemHeights.forEach((item) => {
        resultItems.push({
          ...item,
          offsetY,
        });
        offsetY += item.height + itemMargin;
      });

      onChangeItemsHeight({ id, items: resultItems });
    }
  }, [id, itemHeights /*, onChangeItemsHeight*/]);

  const handleChangeHeight = ({
    id,
    height,
  }: {
    id: string;
    height: number;
  }) => {
    setItemHeights((itemHeights) => {
      // 該当のitemの高さを更新する
      const nextItemHeights = itemHeights.map((item) => {
        if (item.id === id) {
          return { id, height };
        } else {
          return item;
        }
      });
      return nextItemHeights;
    });
  };

  const handleSetItems = (items: { id: string; value: string }[]) => {
    if (onChangeItems) {
      onChangeItems({ id, items });
    }
  };

  return (
    <section className={classes.card}>
      <h2 className={classes.heading}>{label}</h2>
      <ReactSortable
        className={classes["children-container"]}
        list={items}
        setList={handleSetItems}
      >
        {items.map((item) => (
          <IdeaListItem
            key={item.id}
            {...item}
            leftStyle={leftStyle}
            rightStyle={rightStyle}
            onChangeHeight={handleChangeHeight}
          />
        ))}
      </ReactSortable>
    </section>
  );
};

export default IdeaList;
