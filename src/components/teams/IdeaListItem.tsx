import React, { FC, useState, useEffect, useRef } from "react";
import classes from "./IdeaListItem.module.css";

interface IIdeaListItemProps {
  id: string;
  type: "problem" | "solution" | "goal";
  body: string;
  leftStyle: "circle" | "triangle";
  rightStyle: "circle" | "triangle";
  checkboxValue?: boolean;
  emphasized?: boolean;
  onEnter?: (event: IIdeaListItemEnterEvent) => void;
  onClickConnector?: (event: IIdeaListItemClickConnectorEvent) => void;
  onChangeCheckbox?: (event: IIdeaListItemChangeCheckboxEvent) => void;
  onChangeHeight?: (event: IIdeaListItemChangeHeightEvent) => void;
}

export interface IIdeaListItemEnterEvent {
  id: string;
  value: string;
}

export interface IIdeaListItemClickConnectorEvent {
  id: string;
  type: "problem" | "solution" | "goal";
  target: "left" | "right";
}

export interface IIdeaListItemChangeCheckboxEvent {
  id: string;
  value: boolean;
}

export interface IIdeaListItemChangeHeightEvent {
  id: string;
  height: number;
}

const IdeaListItem: FC<IIdeaListItemProps> = ({
  id,
  type,
  body,
  checkboxValue,
  leftStyle,
  rightStyle,
  emphasized,
  onEnter,
  onClickConnector,
  onChangeCheckbox,
  onChangeHeight,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // 入力中の値 エンターキーを押した際にonEnterに渡される
  const [inputValue, setInputValue] = useState(body);

  // コンポーネントの初回レンダー時に高さをonChangeHeightを呼び出す
  useEffect(() => {
    if (ref.current && onChangeHeight) {
      onChangeHeight({ id, height: ref.current.clientHeight });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // prop.value の値が変わったときに、入力フォームの値をvalueに合わせる
  useEffect(() => {
    setInputValue(body);
  }, [body]);

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChangeCheckbox) {
      throw Error(
        "onChangeCheckbox is undefined, though checkboxValue is not undefined"
      );
    }
    onChangeCheckbox({ id, value: e.target.checked });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.key === "Enter" && e.keyCode === 13) {
      onEnter({ id, value: inputValue });
    }
  };

  return (
    <div className={classes.card} ref={ref}>
      {checkboxValue != null && (
        <input
          type="checkbox"
          className={classes.checkbox}
          checked={checkboxValue}
          onChange={handleChangeCheckbox}
        />
      )}
      <input
        type="text"
        className={classes.input}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        style={{ fontWeight: emphasized ? "bold" : "normal" }}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() =>
          onClickConnector && onClickConnector({ id, type, target: "left" })
        }
        className={`${classes.connector} ${classes["connector-left"]}`}
      >
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
      <button
        onClick={() =>
          onClickConnector && onClickConnector({ id, type, target: "right" })
        }
        className={`${classes.connector} ${classes["connector-right"]}`}
      >
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

export default IdeaListItem;
