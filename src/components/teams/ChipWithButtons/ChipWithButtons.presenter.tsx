import { ReactNode } from "react";
import Styles from "./ChipWithButtons.module.scss";
import { DeleteIcon } from "@/assets/deleteIcon";

interface IChipWithButtonsProps {
  id: string;
  label: string;
  leftSlot: ReactNode;
  buttonGroup: ReactNode;
  background: string;
}

const ChipWithButtons = ({ leftSlot, label }: IChipWithButtonsProps) => {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.icon}>{leftSlot}</div>
      <div className={Styles.label}>{label}</div>
      <button className={Styles.delete}>
        <DeleteIcon className={Styles.deleteIcon} />
      </button>
    </div>
  );
};

export { ChipWithButtons };
