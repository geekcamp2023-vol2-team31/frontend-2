import { FC } from "react";
import style from "./TeamSettingsContainer.module.scss";

type Props = {
  teamId: string;
};

export const TeamSettingsContainer: FC<Props> = () => {
  return <div className={style.container}></div>;
};
