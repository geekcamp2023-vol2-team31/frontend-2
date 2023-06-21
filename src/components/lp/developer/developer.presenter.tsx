import Styles from "./developer.module.scss";
import { Card } from "./card";
import IconMgn901 from "#/lp/developer-mgn901.png";
import IconXpadev from "#/lp/developer-xpadev.jpg";
import IconYajima from "#/lp/developer-yajima.jpg";
import IconKitoken from "#/lp/developer-kitoken.png";
import IconSatojin from "#/lp/developer-satojin.png";

const Developer = () => {
  return (
    <div className={Styles.wrapper}>
      <h2 className={Styles.title}>Developed by... 🥳</h2>
      <div className={Styles.container}>
        <Card
          src={IconMgn901.src}
          username={"めがね901"}
          bio={"設計が好き。アーキテクチャもUIも。"}
        />
        <Card src={IconXpadev.src} username={"xpadev"} bio={"そこら辺の学生"} />
        <Card
          src={IconYajima.src}
          username={"矢島 創一"}
          bio={"和室に住んでいる"}
        />
        <Card
          src={IconKitoken.src}
          username={"きとけん"}
          bio={"お寿司がすし"}
        />
        <Card
          src={IconSatojin.src}
          username={"佐藤 仁"}
          bio={"栄養士エンジニア、鯖味噌が好物"}
        />
      </div>
    </div>
  );
};

export { Developer };
