import style from "./TeamSelector.module.scss";
export const TeamSelector = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>技術COMPへようこそ!</h1>
      <p>
        チームで参加するハッカソンのアイディア出しをサポートします!
        <br />
        まずはあなたのチームのアイディア出しの準備をしましょう。
      </p>
      <h2 className={style.subTitle}>
        <img src="/assets/join-team.svg" alt="チームに参加" />
        既存のチームに参加
      </h2>
      <div className={style.formContainer}>
        <input type="text" placeholder="#code" className={style.input} />
        <button className={style.button}>チームに参加</button>
      </div>
      <h2 className={style.subTitle}>
        <img src="/assets/add.svg" alt="新しいチームを作成" />{" "}
        新しいチームを作成
      </h2>

      <div className={style.formContainer}>
        <input type="text" placeholder="チーム名" className={style.input} />
        <button className={style.button}>チームを作成</button>
      </div>
    </div>
  );
};
