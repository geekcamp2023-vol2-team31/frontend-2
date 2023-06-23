import React, { FC, useState, useRef, useEffect } from "react";
import IdeaList, { IIdeaListChangeItemsHeightEvent } from "./IdeaList";
import InterelementLink from "./InterelementLink";
import styles from "@/components/teams/IdeaPage.module.css";
import GetLinkData from "./GetLinkData";
import GetCommentData from "./GetCommentData";
import { IIdeaListItemClickConnectorEvent } from "./IdeaListItem";
interface IIdeaPageProps {
  teamId: string;
}
export interface IComment {
  id: string;
  type: "problem" | "solution" | "goal";
  value: string;
}
interface IItems {
  id: string;
  value: string;
  onClickConnector?: (event: IIdeaListItemClickConnectorEvent) => void;
}
interface ILists {
  items: {
    id: string;
    value: string;
    onClickConnector?: (event: IIdeaListItemClickConnectorEvent) => void;
  }[];
}
interface ILinkElement {
  id: string;
  type: "problem" | "solution" | "goal" | "wait";
  value: string;
}
export interface ILink {
  id: string;
  left: ILinkElement;
  right: ILinkElement;
}

const IdeaPage: FC<IIdeaPageProps> = ({ teamId }) => {
  const margin = 50;
  const localLinks: ILink[] = [];
  //データ取得
  const [lists, setLists] = useState<ILists[]>([
    { items: [] },
    { items: [] },
    { items: [] },
  ]);
  const [links, setLinks] = useState<ILink[]>([]);
  const [cursolPosition, setCursolPosition] = useState<number[]>();
  useEffect(() => {
    void GetCommentData(teamId).then((commentData: IComment[]) => {
      const Comments: IItems[][] = [[], [], []];
      commentData.map((comment) => {
        if (comment.type === "problem")
          Comments[0].push({ id: comment.id, value: comment.value });
        if (comment.type === "goal")
          Comments[1].push({ id: comment.id, value: comment.value });
        if (comment.type === "solution")
          Comments[2].push({ id: comment.id, value: comment.value });
      });
      setLists([
        { items: Comments[0] },
        { items: Comments[1] },
        { items: Comments[2] },
      ]);
    });
    const fetchData = async () => {
      const data = await GetLinkData(teamId);
      if (data) setLinks(data);
    };
    void fetchData();
    const handleMouseMove = (e: MouseEvent) => {
      setCursolPosition([e.pageX, e.pageY]);
    };
    document.body.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  links.map((link) => {
    localLinks.push(link);
  });

  //ｙ座標取得
  const [item1Heights, setItem1Heights] = useState<
    IIdeaListChangeItemsHeightEvent["items"]
  >([]);
  const [item2Heights, setItem2Heights] = useState<
    IIdeaListChangeItemsHeightEvent["items"]
  >([]);
  const [item3Heights, setItem3Heights] = useState<
    IIdeaListChangeItemsHeightEvent["items"]
  >([]);
  const handleChangeItemsHeight = ({
    id,
    items,
  }: IIdeaListChangeItemsHeightEvent) => {
    if (id === "1") {
      setItem1Heights(items);
    } else if (id === "2") {
      setItem2Heights(items);
    } else {
      setItem3Heights(items);
    }
  };

  //x座標取得
  const column1 = useRef<HTMLDivElement>(null);
  const column2 = useRef<HTMLDivElement>(null);
  const column3 = useRef<HTMLDivElement>(null);
  const [column1Position, setColumn1Position] = useState<DOMRect | null>(null);
  const [column2Position, setColumn2Position] = useState<DOMRect | null>(null);
  const [column3Position, setColumn3Position] = useState<DOMRect | null>(null);
  const getColumnPositions = () => {
    if (column1.current) {
      setColumn1Position(column1.current.getBoundingClientRect());
    }
    if (column2.current) {
      setColumn2Position(column2.current.getBoundingClientRect());
    }
    if (column3.current) {
      setColumn3Position(column3.current.getBoundingClientRect());
    }
  };
  useEffect(getColumnPositions, [item1Heights, item1Heights, item1Heights]);

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
        if (column1Position) x0 = column1Position.right;
        const item = item1Heights.find((item) => item.id === link.left.id);
        if (item) y0 = item.offsetY + item.height / 2 + margin;
      }
      if (link.left.type === "goal") {
        if (column2Position) x0 = column2Position.right;
        const item = item2Heights.find((item) => item.id === link.left.id);
        if (item) y0 = item.offsetY + item.height / 2 + margin;
      }
      if (link.left.type === "solution") {
        if (column3Position) x0 = column3Position.right;
        const item = item3Heights.find((item) => item.id === link.left.id);
        if (item) y0 = item.offsetY + item.height / 2 + margin;
      }
    }
    if (link.right.id === "-1") {
      if (cursolPosition) {
        x1 = cursolPosition[0];
        y1 = cursolPosition[1];
      }
    } else {
      if (link.right.type === "problem") {
        if (typeof column1Position?.right === "number")
          x1 = column1Position.left;
        const item = item1Heights.find((item) => item.id === link.right.id);
        if (item) y1 = item.offsetY + item.height / 2 + margin;
      }
      if (link.right.type === "goal") {
        if (typeof column2Position?.right === "number")
          x1 = column2Position.left;
        const item = item2Heights.find((item) => item.id === link.right.id);
        if (item) y1 = item.offsetY + item.height / 2 + margin;
      }
      if (link.right.type === "solution") {
        if (typeof column3Position?.right === "number")
          x1 = column3Position.left;
        const item = item3Heights.find((item) => item.id === link.right.id);
        if (item) y1 = item.offsetY + item.height / 2 + margin;
      }
    }
    return { id: link.id, x0, y0, x1, y1 };
  };

  const linkPositions = links.map(getLinkPosition);

  const [connectorToggle, setConnectorToggle] = useState<
    "left" | "right" | null
  >(null);
  let copyToggle: "left" | "right" | null = null;
  const handleClickConnector = ({
    id,
    type,
    target,
  }: IIdeaListItemClickConnectorEvent) => {
    const copyLinks: ILink[] = links;

    if (
      (target === "left" && type === "problem") ||
      (target === "right" && type === "solution")
    ) {
      if (copyToggle) copyLinks.pop();
      copyToggle = null;
      return;
    }
    //片方をクリック中
    //左が固定の時
    if (copyToggle === "left") {
      if (type === copyLinks[copyLinks.length - 1].right.type) {
        copyLinks[copyLinks.length - 1].right.id = id;
        copyToggle = null;
      } else {
        copyLinks.pop();
        copyToggle = null;
      }
    } //右が固定の時
    else if (copyToggle === "right") {
      if (type === copyLinks[copyLinks.length - 1].left.type) {
        copyLinks[copyLinks.length - 1].left.id = id;
        copyToggle = null;
      } else {
        copyLinks.pop();
        copyToggle = null;
      }
    }
    //何もクリックしていないとき
    else {
      let left: ILinkElement = { type: "wait", id: "0", value: "" };
      let right: ILinkElement = { type: "wait", id: "0", value: "" };
      if (target === "left") {
        copyToggle = "right";
        right = { type: type, id: id, value: "" };
        if (type === "goal") left = { type: "problem", id: "-1", value: "" };
        else left = { type: "goal", id: "-1", value: "" };
      } else if (target === "right") {
        copyToggle = "left";
        left = { type: type, id: id, value: "" };
        if (type === "goal") right = { type: "solution", id: "-1", value: "" };
        else right = { type: "goal", id: "-1", value: "" };
      }
      copyLinks.push({
        id: String(Number(copyLinks[copyLinks.length - 1].id) + 1),
        left: left,
        right: right,
      });
      setConnectorToggle(copyToggle);
      console.log(copyToggle);
      setLinks(copyLinks);
    }
  };
  useEffect(() => {
    lists.forEach((list) => {
      list.items.forEach((item) => {
        item.onClickConnector = handleClickConnector;
      });
    });
  }, [lists]);

  return (
    <div className={styles.Idea}>
      <div className={styles.list} ref={column1}>
        <IdeaList
          id="1"
          label="困り事・背景"
          type="problem"
          leftStyle="circle"
          rightStyle="triangle"
          items={lists[0].items}
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
    </div>
  );
};
export default IdeaPage;
