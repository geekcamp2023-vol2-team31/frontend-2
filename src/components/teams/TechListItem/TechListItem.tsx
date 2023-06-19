import { MouseEvent, ReactNode, useMemo, useState } from "react";
import classes from "./TechListItem.module.scss";
import { PlusIcon } from "@/assets/plusIcon";
import { FlagIcon } from "@/assets/flagIcon";
import { SchoolIcon } from "@/assets/schoolIcon";
import { DrawIcon } from "@/assets/drawIcon";
import { MinusIcon } from "@/assets/minusIcon";

export interface ITechListItem {
  id: string;
  label: string;
  leftSlot: ReactNode;
  users: ITechListUser[];
  actionType: "plus" | "minus";
  onActionClick: (event: { id: string; actionType: "plus" | "minus" }) => void;
}

interface ITechListUser {
  id: string;
  name: string;
  level: "beginner" | "advanced" | "expert";
}

const TechListItem = ({
  id,
  label,
  leftSlot,
  users,
  actionType,
  onActionClick,
}: ITechListItem) => {
  const [isOpen, setIsOpen] = useState(true);
  const usersOfLevel = (users: ITechListUser[], level: string) => {
    return users.filter((user) => user.level === level);
  };
  const beginnerUsers = useMemo(() => usersOfLevel(users, "beginner"), [users]);
  const advancedUsers = useMemo(() => usersOfLevel(users, "advanced"), [users]);
  const expertUsers = useMemo(() => usersOfLevel(users, "expert"), [users]);

  const handleClickHeader = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleActionClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onActionClick({ id, actionType });
  };

  return (
    <div className={classes.container}>
      <div className={classes.header} onClick={handleClickHeader}>
        <div>{leftSlot}</div>
        <div className={classes.label}>{label}</div>
        <div className={classes["tech-count"]}>
          <FlagIcon className={classes.icon} />
          {beginnerUsers.length}
        </div>
        <div className={classes["tech-count"]}>
          <DrawIcon className={classes.icon} />
          {advancedUsers.length}
        </div>
        <div className={classes["tech-count"]}>
          <SchoolIcon className={classes.icon} />
          {expertUsers.length}
        </div>
        <button className={classes.action} onClick={handleActionClick}>
          {actionType === "plus" ? (
            <PlusIcon className={classes.action} />
          ) : (
            <MinusIcon className={classes.action} />
          )}
        </button>
      </div>
      {isOpen && (
        <div className={classes.detail}>
          <div className={classes.tech}>
            <FlagIcon className={classes.icon} />
            <ul className={classes.list}>
              {beginnerUsers.length === 0 ? (
                <div>(なし)</div>
              ) : (
                beginnerUsers.map((user) => <li key={user.id}>{user.name}</li>)
              )}
            </ul>
          </div>
          <div className={classes.tech}>
            <DrawIcon className={classes.icon} />
            <ul className={classes.list}>
              {advancedUsers.length === 0 ? (
                <div>(なし)</div>
              ) : (
                advancedUsers.map((user) => <li key={user.id}>{user.name}</li>)
              )}
            </ul>
          </div>
          <div className={classes.tech}>
            <SchoolIcon className={classes.icon} />
            <ul className={classes.list}>
              {expertUsers.length === 0 ? (
                <div>(なし)</div>
              ) : (
                expertUsers.map((user) => <li key={user.id}>{user.name}</li>)
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechListItem;
