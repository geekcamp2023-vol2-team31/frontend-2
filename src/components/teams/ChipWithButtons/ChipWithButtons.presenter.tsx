import { ReactNode } from "react";
import Styles from "./ChipWithButtons.module.scss";

interface IChipWithButtonsProps {
  id: string;
  label: string;
  leftSlot: ReactNode;
  buttonGroup: ReactNode;
  background: string;
}

const ChipWithButtons = ({
  leftSlot,
  label,
  buttonGroup,
}: IChipWithButtonsProps) => {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.icon}>{leftSlot}</div>
      <div className={Styles.label}>{label}</div>
      <div className={Styles.buttons}>{buttonGroup}</div>
    </div>
  );
};

export { ChipWithButtons };
