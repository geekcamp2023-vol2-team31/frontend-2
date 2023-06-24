import { FC } from "react";
import style from "./Header.module.scss";
interface HeaderProps {
  title: string;
  invidationCode?: string;
  onHomeButtonClick?: () => void;
}
export const Header: FC<HeaderProps> = ({
  title,
  invidationCode,
  onHomeButtonClick,
}) => {
  return (
    <header className={style.header}>
      <button className={style.buttonContainer} onClick={onHomeButtonClick}>
        <img src="/assets/apps.svg" alt="" />
        <img src="/assets/logo.svg" alt="ロゴ" />
      </button>
      {invidationCode ? (
        <input className={style.input} type="text" defaultValue={title}></input>
      ) : (
        <p className={style.title}>{title}</p>
      )}
      {invidationCode && (
        <div className={style.flex}>
          <button className={style.buttonContainer}>
            <img src="/assets/join-team.svg" alt="チームに参加" />
            <strong>コード{invidationCode}</strong>
          </button>
          <button className={style.buttonContainer}>
            <img src="/assets/group.svg" alt="グループ" />
          </button>
        </div>
      )}
    </header>
  );
};
