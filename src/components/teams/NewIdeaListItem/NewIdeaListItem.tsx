import React, { FC, useState, useRef } from "react";
import classes from "./NewIdeaListItem.module.css";

interface IIdeaListItemProps {
  id: string;
  leftStyle: "circle" | "triangle";
  rightStyle: "circle" | "triangle";
  onEnter?: (event: IIdeaListItemEnterEvent) => void;
}

export interface IIdeaListItemEnterEvent {
  id: string;
  value: string;
}

const NewIdeaListItem: FC<IIdeaListItemProps> = ({
  id,
  leftStyle,
  rightStyle,
  onEnter,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // 入力中の値 エンターキーを押した際にonEnterに渡される
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.key === "Enter" && e.keyCode === 13) {
      onEnter({ id, value: inputValue });
      setInputValue("");
    }
  };

  return (
    <div className={classes.card} ref={ref}>
      <input
        type="text"
        placeholder="追加"
        value={inputValue}
        className={classes.input}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={`${classes.connector} ${classes["connector-left"]}`}>
        {leftStyle === "circle" ? (
          // circle
          <svg viewBox="0 0 70 100" height="20" width="20">
            <path d="M 70 0 A 50 50 -90 1 0 70 100 Z" />
          </svg>
        ) : (
          // triangle
          <svg viewBox="0 0 70 100" height="20" width="20">
            <path d="M 0 50 L 70 0 L 70 100 Z" />
          </svg>
        )}
      </button>
      <button className={`${classes.connector} ${classes["connector-right"]}`}>
        {rightStyle === "circle" ? (
          // circle
          <svg viewBox="0 0 70 100" height="20" width="20">
            <path d="M 0 0 A 50 50 -90 1 1 0 100 Z" />
          </svg>
        ) : (
          // triangle
          <svg viewBox="0 0 70 100" height="20" width="20">
            <path d="M 0 0 L 70 50 L 0 100 Z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default NewIdeaListItem;
