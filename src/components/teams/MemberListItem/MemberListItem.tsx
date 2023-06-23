import { ReactNode } from "react";
import classes from "./MemberListItem.module.scss";

export interface ITechListItem {
  label: string;
  leftSlot: ReactNode;
}

const MemberListItem = ({ label, leftSlot }: ITechListItem) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>{leftSlot}</div>
        <div className={classes.label}>{label}</div>
      </div>
    </div>
  );
};

export default MemberListItem;
