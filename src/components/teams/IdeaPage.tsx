import React, { FC, useState, useEffect } from "react";
import IdeaList, { IIdeaListChangeItemsHeightEvent } from "./IdeaList";
import styles from "@/components/teams/IdeaPage.module.css";
import GetLinkData from "./GetLinkData";
import GetCommentData from "./GetCommentData";
interface IIdeaPageProps {
  teamId: string;
}
export interface IComment {
  id: string;
  type: "problem" | "solution" | "goal";
  comment: string;
}
interface IItems {
  id: string;
  value: string;
}
interface Ilists {
  items: IItems[];
}
interface linkElement {
  id: string;
  type: "problem" | "solution" | "goal" | "wait";
  value: string;
}
export interface ILink {
  id: string;
  left: linkElement;
  right: linkElement;
}

const IdeaPage: FC<IIdeaPageProps> = ({ teamId }) => {
  //データ取得
  const [lists, setLists] = useState<Ilists[]>([
    { items: [] },
    { items: [] },
    { items: [] },
  ]);
  const [links, setLinks] = useState<ILink[]>([]);
  useEffect(() => {
    void GetCommentData(teamId).then((commentData: IComment[]) => {
      const Comments: IItems[][] = [[], [], []];
      commentData.map((comment) => {
        if (comment.type === "problem")
          Comments[0].push({ id: comment.id, value: comment.comment });
        if (comment.type === "goal")
          Comments[1].push({ id: comment.id, value: comment.comment });
        if (comment.type === "solution")
          Comments[2].push({ id: comment.id, value: comment.comment });
      });
      setLists([
        { items: Comments[0] },
        { items: Comments[1] },
        { items: Comments[2] },
      ]);
    });
    void GetLinkData(teamId).then((LinkData: ILink[]) => {
      setLinks(LinkData);
    });
  }, []);

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
  console.log(links);
  console.log(item1Heights);
  console.log(item2Heights);
  console.log(item3Heights);
  return (
    <div className={styles.Idea}>
      <div className={styles.list}>
        <IdeaList
          id="1"
          label="困り事・背景"
          // type="problem"
          leftStyle="circle"
          rightStyle="triangle"
          items={lists[0].items}
          onChangeItemsHeight={handleChangeItemsHeight}
        />
      </div>
      <div className={styles.list}>
        <IdeaList
          id="2"
          label="どうしたいか"
          // type="goal"
          leftStyle="triangle"
          rightStyle="triangle"
          items={lists[1].items}
          onChangeItemsHeight={handleChangeItemsHeight}
        />
      </div>
      <div className={styles.list}>
        <IdeaList
          id="3"
          label="解決策"
          // type="solution"
          leftStyle="triangle"
          rightStyle="circle"
          items={lists[2].items}
          onChangeItemsHeight={handleChangeItemsHeight}
        />
      </div>
    </div>
  );
};
export default IdeaPage;
