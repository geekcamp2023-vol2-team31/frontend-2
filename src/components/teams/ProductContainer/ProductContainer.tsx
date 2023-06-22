import { FC } from "react";
import { ITechListItem } from "../TechListItem";
import style from "./ProductContainer.module.scss";
import { CloseIcon } from "@/assets/close";
import TechListItem from "../TechListItem/TechListItem";

type Props = {
  ideaName: string;
  estimatedTechList: ITechListItem[];
  memberHasTechList: ITechListItem[];
  onClose: () => void;
};

export const ProductContainer: FC<Props> = ({
  ideaName,
  estimatedTechList,
  memberHasTechList,
  onClose,
}) => {
  return (
    <div className={style.container}>
      <div className={style.inputContainer}>
        <input type="text" defaultValue={ideaName} className={style.input} />
        <button className={style.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <div className={style.techContainer}>
        <p className={style.title}>使用予定の技術</p>
        <div className={style.techWrapper}>
          {estimatedTechList.map((iTech) => {
            return (
              <TechListItem
                key={iTech.id}
                id={iTech.id}
                label={iTech.label}
                leftSlot={iTech.leftSlot}
                users={iTech.users}
                actionType={iTech.actionType}
                onActionClick={iTech.onActionClick}
              />
            );
          })}
        </div>
      </div>
      <div className={style.techContainer}>
        <p className={style.title}>メンバーが持っている技術</p>
        <div className={style.techWrapper}>
          {memberHasTechList.map((iTech) => {
            return (
              <TechListItem
                key={iTech.id}
                id={iTech.id}
                label={iTech.label}
                leftSlot={iTech.leftSlot}
                users={iTech.users}
                actionType={iTech.actionType}
                onActionClick={iTech.onActionClick}
              />
            );
          })}
        </div>
      </div>

      <button className={style.deleteButton}>技術COMPを削除</button>
    </div>
  );
};
