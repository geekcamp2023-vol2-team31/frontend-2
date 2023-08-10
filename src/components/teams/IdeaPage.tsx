import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useMemo,
  Fragment,
} from "react";
import IdeaList, { IIdeaListChangeItemsHeightEvent } from "./IdeaList";
import InterelementLink from "./InterelementLink";
import styles from "@/components/teams/IdeaPage.module.css";
import { IIdeaListItemClickConnectorEvent } from "./IdeaListItem";
import { useTeamLinks } from "@/hooks/useTeamLinks";
import { ProductFrame } from "./ProductFrame";
import { useTeamComments } from "@/hooks/useTeamComments";
import { useTeamProducts } from "@/hooks/useTeamProducts";
import {uuid} from "@/utils/uuid";

interface IIdeaPageProps {
  teamId: string;
  onProductClick: (event: { id: string }) => void;
}
type CommentType = "problem" | "solution" | "goal";
export interface IComment {
  id: string;
  type: CommentType;
  body: string;
}
interface ILinkElement {
  id: string;
  type: "problem" | "solution" | "goal";
  value: string;
}
export interface ILink {
  id: string;
  left: ILinkElement;
  right: ILinkElement;
}
export interface ICommentPosition {
  id: string;
  height: number;
  offsetY: number;
}
export interface IBoundingBox {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
interface IProduct {
  id: string;
  name: string;
  comments: IComment[];
  techs: { name: string }[];
}

const IdeaPage: FC<IIdeaPageProps> = ({ teamId, onProductClick }) => {
  // TODO: エレメントに合わせる
  const teamBody = useRef<HTMLDivElement>(null);

  const localLinks: ILink[] = [];
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [commentsSelected, setCommentsSelected] = useState<{ id: string }[]>(
    []
  );
  const [temporaryLink, setTemporaryLink] = useState<
    Partial<ILink> | undefined
  >(undefined);
  const [cursolPosition, setCursolPosition] = useState<number[]>();

  //x座標取得用
  const column1 = useRef<HTMLDivElement>(null);
  const column2 = useRef<HTMLDivElement>(null);
  const column3 = useRef<HTMLDivElement>(null);

  //ｙ座標取得用
  const [item1Heights, setItem1Heights] = useState<ICommentPosition[]>([]);
  const [item2Heights, setItem2Heights] = useState<ICommentPosition[]>([]);
  // solutionの各commentの位置情報
  const [item3Heights, setItem3Heights] = useState<ICommentPosition[]>([]);
  // ソリューションのIdeaListの境界座標(上下左右)
  const [bbox, setBbox] = useState<IBoundingBox | undefined>(undefined);
  // connectorの情報管理
  const [connectorToggle, setConnectorToggle] = useState<
    "left" | "right" | null
  >(null);

  // link一覧の取得
  const {
    data: linksData,
    isLoading: isLoadingLinks,
    setData: setLinksData,
  } = useTeamLinks(teamId);

  // コメント一覧の取得
  const {
    data: commentsData,
    isLoading: isLoadingComments,
    setData: setComments,
  } = useTeamComments(teamId);
  const addLink = (link: ILink) => {
    if (!linksData) {
      throw new Error("linksデータが取得できていません");
    }
    if (!link.left || !link.left.id || !link.right || !link.right.id) {
      throw new Error(
        "新しく作るLinkのうち左右のどちらかのIDが指定されていません"
      );
    }

    setLinksData({
      links: [
        ...linksData.links,
        {
          id: uuid(),
          leftCommentId: link.left.id,
          rightCommentId: link.right.id,
        },
      ],
    });
  };

  const handleClickConnector = ({
    id,
    type,
    target,
  }: IIdeaListItemClickConnectorEvent) => {
    // この関数をmapで渡しているためか、関数内でtemporaryLinkを参照すると
    // うまく反映されていない値が出てくる。
    // そこで手続き全体をsetTemporaryLinkで囲っている
    console.log({ target, id, type });
    setTemporaryLink((temporaryLink) => {
      if (
        (target === "left" && type === "problem") ||
        (target === "right" && type === "solution")
      ) {
        setConnectorToggle(null);
        if (temporaryLink) return undefined;
      }
      // 右端や左端の、対応するtypeがない時はundefinedを返す
      //TODO setConnectorToggleの調整
      const getCorrespondingType = (
        type: CommentType,
        decided: "left" | "right"
      ): CommentType | undefined => {
        if (type === "problem") {
          return decided === "right" ? undefined : "goal";
        } else if (type === "goal") {
          setConnectorToggle(null);
          return decided === "right" ? "problem" : "solution";
        } /* type === "solution" */ else {
          return decided === "right" ? "goal" : undefined;
        }
      };

      //片方をクリック中
      //左が固定の時
      if (temporaryLink && temporaryLink.left) {
        // 線を引けるような(対応する)コメントをクリックしたとき
        setConnectorToggle(null);
        if (
          target === "left" &&
          type === getCorrespondingType(temporaryLink.left.type, "left")
        ) {
          addLink({ ...temporaryLink, right: { id, type, value: "" } });
          return undefined;
        } else {
          // 線を引くのをキャンセルする
          return undefined;
        }
      }
      //右が固定の時
      else if (temporaryLink && temporaryLink.right) {
        // 線を引けるような(対応する)コメントをクリックしたとき
        setConnectorToggle(null);
        if (
          target === "right" &&
          type === getCorrespondingType(temporaryLink.right.type, "right")
        ) {
          addLink({ ...temporaryLink, left: { id, type, value: "" } });
          return undefined;
        } else {
          // 線を引くのをキャンセルする
          return undefined;
        }
      }
      //何もクリックしていないとき
      else {
        if (target === "left") {
          setConnectorToggle("right");
          return { id: "-1", right: { id, type, value: "" } };
        } else if (target === "right") {
          setConnectorToggle("left");
          return { id: "-1", left: { id, type, value: "" } };
        }
      }
    });
  };
  const onChangeCheckbox = ({ id, value }: { id: string; value: boolean }) => {
    if (value) {
      // 選択中のコメントに追加
      setCommentsSelected((arr) => [...arr, { id }]);
    } else {
      // 選択中のコメントから排除
      setCommentsSelected((arr) => arr.filter((c) => c.id !== id));
    }
  };

  const lists = useMemo(() => {
    if (!commentsData?.comments) {
      return [{ items: [] }, { items: [] }, { items: [] }];
    }
    const filterByType =
      (type: "problem" | "goal" | "solution") => (c: IComment) =>
        c.type === type;
    const addClickHander = (c: IComment) => ({
      ...c,
      onClickConnector: handleClickConnector,
    });
    return [
      {
        items: commentsData.comments
          .filter(filterByType("problem"))
          .map(addClickHander),
      },
      {
        items: commentsData.comments
          .filter(filterByType("goal"))
          .map(addClickHander),
      },
      {
        // 解決策についてはチェックボックスを付け得る
        items: commentsData.comments
          .filter(filterByType("solution"))
          .map(addClickHander)
          .map((comment) => {
            if (isAddingProduct) {
              return {
                ...comment,
                checkboxValue: commentsSelected.some(
                  (c) => c.id === comment.id
                ),
                onChangeCheckbox,
              };
            } else {
              return comment;
            }
          }),
      },
    ];
  }, [commentsData, isAddingProduct, commentsSelected]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursolPosition([e.pageX, e.pageY]);
    };
    if (temporaryLink) {
      document.body.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, [temporaryLink]);

  // render関係: アイテムの高さ変更時
  const handleChangeItemsHeight = ({
    id,
    items,
  }: IIdeaListChangeItemsHeightEvent) => {
    console.log({ id, items });
    if (id === "1") {
      setItem1Heights(items);
    } else if (id === "2") {
      setItem2Heights(items);
    } else {
      setItem3Heights(items);
    }
  };

  const links = linksData?.links ?? [];

  links.map((link) => {
    localLinks.push(link);
  });
  const getTempPosition = (link: Partial<ILink>) => {
    let x0 = 0;
    let y0 = 0;
    let x1 = 200;
    let y1 = 0;

    if (!link.left || !link.left.id) {
      if (cursolPosition && teamBody.current) {
        x0 = cursolPosition[0];
        y0 = cursolPosition[1] - teamBody.current.offsetTop;
      }
    } else {
      const id = link.left.id;
      if (link.left.type === "problem") {
        if (column1.current?.getBoundingClientRect())
          x0 = column1.current?.getBoundingClientRect().right;
        const item = item1Heights.find((item) => item.id === id);
        if (item && typeof column1.current?.offsetTop === "number")
          y0 = item.offsetY + item.height / 2 + column1.current?.offsetTop;
      }
      if (link.left.type === "goal") {
        if (column2.current?.getBoundingClientRect())
          x0 = column2.current?.getBoundingClientRect().right;
        const item = item2Heights.find((item) => item.id === id);
        if (item && typeof column2.current?.offsetTop === "number")
          y0 = item.offsetY + item.height / 2 + column2.current?.offsetTop;
      }
      if (link.left.type === "solution") {
        if (column3.current?.getBoundingClientRect())
          x0 = column3.current?.getBoundingClientRect().right;
        const item = item3Heights.find((item) => item.id === id);
        if (item && typeof column3.current?.offsetTop === "number")
          y0 = item.offsetY + item.height / 2 + column3.current?.offsetTop;
      }
    }
    if (!link.right) {
      if (cursolPosition && teamBody.current) {
        x1 = cursolPosition[0];
        y1 = cursolPosition[1] - teamBody.current.offsetTop;
      }
    } else {
      const id = link.right.id;
      if (link.right.type === "problem") {
        if (typeof column1.current?.getBoundingClientRect()?.right === "number")
          x1 = column1.current?.getBoundingClientRect().left;
        const item = item1Heights.find((item) => item.id === id);
        if (item && typeof column1.current?.offsetTop === "number")
          y1 = item.offsetY + item.height / 2 + column1.current?.offsetTop;
      }
      if (link.right.type === "goal") {
        if (typeof column2.current?.getBoundingClientRect()?.right === "number")
          x1 = column2.current?.getBoundingClientRect().left;
        const item = item2Heights.find((item) => item.id === id);
        if (item && typeof column2.current?.offsetTop === "number")
          y1 = item.offsetY + item.height / 2 + column2.current?.offsetTop;
      }
      if (link.right.type === "solution") {
        if (typeof column3.current?.getBoundingClientRect()?.right === "number")
          x1 = column3.current?.getBoundingClientRect().left;
        const item = item3Heights.find((item) => item.id === id);
        if (item && typeof column3.current?.offsetTop === "number")
          y1 = item.offsetY + item.height / 2 + column3.current?.offsetTop;
      }
    }
    return { id: link.id, x0, y0, x1, y1 };
  };

  const getLinkPosition = (link: ILink) => {
    let x0 = 0;
    let y0 = 0;
    let x1 = 200;
    let y1 = 0;
    if (link.left.id === "-1") {
      if (cursolPosition) {
        x0 = cursolPosition[0];
        y0 = cursolPosition[1];
      }
    } else {
      if (link.left.type === "problem") {
        if (column1.current?.getBoundingClientRect())
          x0 = column1.current?.getBoundingClientRect().right;
        const item = item1Heights.find((item) => item.id === link.left.id);
        if (item && typeof column1.current?.offsetTop === "number")
          y0 = item.offsetY + item.height / 2 + column1.current?.offsetTop;
      }
      if (link.left.type === "goal") {
        if (column2.current?.getBoundingClientRect())
          x0 = column2.current?.getBoundingClientRect().right;
        const item = item2Heights.find((item) => item.id === link.left.id);
        if (item && typeof column2.current?.offsetTop === "number")
          y0 = item.offsetY + item.height / 2 + column2.current?.offsetTop;
      }
      if (link.left.type === "solution") {
        if (column3.current?.getBoundingClientRect())
          x0 = column3.current?.getBoundingClientRect().right;
        const item = item3Heights.find((item) => item.id === link.left.id);
        if (item && typeof column3.current?.offsetTop === "number")
          y0 = item.offsetY + item.height / 2 + column3.current?.offsetTop;
      }
    }
    if (link.right.id === "-1") {
      if (cursolPosition) {
        x1 = cursolPosition[0];
        y1 = cursolPosition[1];
      }
    } else {
      if (link.right.type === "problem") {
        if (typeof column1.current?.getBoundingClientRect()?.right === "number")
          x1 = column1.current?.getBoundingClientRect().left;
        const item = item1Heights.find((item) => item.id === link.right.id);
        if (item && typeof column1.current?.offsetTop === "number")
          y1 = item.offsetY + item.height / 2 + column1.current?.offsetTop;
      }
      if (link.right.type === "goal") {
        if (typeof column2.current?.getBoundingClientRect()?.right === "number")
          x1 = column2.current?.getBoundingClientRect().left;
        const item = item2Heights.find((item) => item.id === link.right.id);
        if (item && typeof column2.current?.offsetTop === "number")
          y1 = item.offsetY + item.height / 2 + column2.current?.offsetTop;
      }
      if (link.right.type === "solution") {
        if (typeof column3.current?.getBoundingClientRect()?.right === "number")
          x1 = column3.current?.getBoundingClientRect().left;
        const item = item3Heights.find((item) => item.id === link.right.id);
        if (item && typeof column3.current?.offsetTop === "number")
          y1 = item.offsetY + item.height / 2 + column3.current?.offsetTop;
      }
    }
    return { id: link.id, x0, y0, x1, y1 };
  };

  // TODO: 画面サイズ変更に対応するには上が適切と思われるがエラーが出るため保留
  // const linkPositions = useMemo(() => links.map(getLinkPosition), [links]);

  // const linkPositions = temporaryLink
  //   ? [...links.map(getLinkPosition), getTempPosition(temporaryLink)]
  //   : links.map(getLinkPosition)

  // const [linkPositions, setLinkPositions] = useState();
  const linkPositions = temporaryLink
    ? [...links.map(getLinkPosition), getTempPosition(temporaryLink)]
    : links.map(getLinkPosition);
  // console.log(linkPositions)
  // Linkのうち確定している方
  // let copyToggle: "left" | "right" | null = null;

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    setData: setProductsData,
  } = useTeamProducts(teamId);

  if (isLoadingProducts) {
    return null;
  }

  // render関係: フレームの大きさを計算していそう。
  const getProductBoundingBox = (product: IProduct) => {
    const findHeight = (commentId: string) => {
      const h = item3Heights.find((e) => e.id === commentId);
      return h;
    };
    const comments = product.comments;
    const firstHeights = findHeight(comments[0].id);
    if (!firstHeights) {
      return undefined;
    }
    let top = firstHeights.offsetY;
    let bottom = firstHeights.height + firstHeights.offsetY;
    product.comments.forEach((comment) => {
      const heights = findHeight(comment.id);
      if (heights) {
        if (heights.offsetY < top) {
          top = heights.height;
        }
        if (heights.height + heights.offsetY > bottom) {
          bottom = heights.height + heights.offsetY;
        }
      }
    });
    const marginT = bbox?.top || 0;
    const x = bbox?.left || 0;
    const width = (bbox?.right || 0) - (bbox?.left || 0);
    return { x, width, y: marginT + top, height: bottom - top };
  };

  // render関係: VM
  const products = productsData?.products.map((p) => {
    const bbox = getProductBoundingBox(p);
    return {
      ...p,
      bbox,
    };
  });
  if (!products) {
    return null;
  }
  const handleNewProduct = () => {
    setIsAddingProduct(true);
  };
  const handleDecide = () => {
    if (commentsSelected.length === 0) {
      setIsAddingProduct(false);
      return;
    }
    setProductsData({
      products: [
        ...(productsData?.products ?? []),
        {
          id: "new",
          name: "新しいプロダクト",
          comments:
            commentsData?.comments
              .filter((c) => commentsSelected.some((e) => e.id === c.id))
              .map((c) => c.id) ?? [],
          techs: [],
        },
      ],
    });
  };

  // アイテム追加時に呼ばれる
  const handleAddItem = ({ id, body: body }: { id: "problem" | "goal" | "solution"; body: string }) => {
    if (body === "") {
      return;
    }
    setComments({
      comments: [...(commentsData?.comments ?? []), {
        id: 'new',
        type: id,
        body: body,
      }]
    });
  };

  return (
    <div ref={teamBody}>
      <div className={styles.Idea}>
        <div className={styles.list} ref={column1}>
          <IdeaList
            id="1"
            label="困り事・背景"
            type="problem"
            leftStyle="circle"
            rightStyle="triangle"
            items={lists[0].items}
            onAddItem={handleAddItem}
            onChangeItemsHeight={handleChangeItemsHeight}
          />
        </div>
        <div className={styles.list} ref={column2}>
          <IdeaList
            id="2"
            label="どうしたいか"
            type="goal"
            leftStyle="triangle"
            rightStyle="triangle"
            items={lists[1].items}
            onChangeItemsHeight={handleChangeItemsHeight}
            onAddItem={handleAddItem}
          />
        </div>
        <div className={styles.list} ref={column3}>
          <IdeaList
            id="3"
            label="解決策"
            type="solution"
            leftStyle="triangle"
            rightStyle="circle"
            items={lists[2].items}
            onChangeItemsHeight={handleChangeItemsHeight}
            onAddItem={handleAddItem}
            onChangeBbox={(e) => setBbox(e)}
          />
        </div>
        {linkPositions.map((link) => (
          <InterelementLink
            key={link.id}
            x0={link.x0}
            y0={link.y0}
            x1={link.x1}
            y1={link.y1}
            emphasized={true}
            connectorToggle={connectorToggle}
          />
        ))}
        {!isAddingProduct ? (
          <button onClick={handleNewProduct}>プロダクトを追加する</button>
        ) : (
          <button onClick={handleDecide}>決定</button>
        )}
        {products.map((product) => (
          <Fragment key={product.id}>
            {product.bbox && (
              <ProductFrame
                id={product.id}
                label={product.name}
                x={product.bbox.x}
                y={product.bbox.y}
                width={product.bbox.width}
                height={product.bbox.height}
                onClick={onProductClick}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default IdeaPage;
