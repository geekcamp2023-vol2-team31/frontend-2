import React, { FC, useState, useEffect } from "react";
import classes from "./IdeaListItem.module.css";

interface IIdeaListItemProps {
  id: string;
  value: string;
  checkboxValue?: boolean;
  emphasized?: boolean;
  onEnter?: (event: IIdeaListItemEnterEvent) => void;
  onClickConnector?: (event: IIdeaListItemClickConnectorEvent) => void;
  onChangeCheckbox?: (event: IIdeaListItemChangeCheckboxEvent) => void;
}

interface IIdeaListItemEnterEvent {
  id: string;
  value: string;
}

interface IIdeaListItemClickConnectorEvent {
  id: string;
  target: 'left' | 'right';
}

interface IIdeaListItemChangeCheckboxEvent {
  id: string;
  value: boolean;
}

const IdeaListItem: FC<IIdeaListItemProps> = ({
  id, value, checkboxValue, emphasized, onEnter, onClickConnector, onChangeCheckbox
}) => {
  // 入力中の値 エンターキーを押した際にonEnterに渡される
  const [inputValue, setInputValue] = useState(value);

  // prop.value の値が変わったときに、入力フォームの値をvalueに合わせる
  useEffect(() => { setInputValue(value); }, [value]);

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChangeCheckbox) {
      throw Error('onChangeCheckbox is undefined, though checkboxValue is not undefined'); 
    }
    onChangeCheckbox({ id, value: e.target.checked });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.key === "Enter" && e.keyCode === 13) {
      onEnter({ id, value: inputValue });
    }
  };

  return (
    <div className={classes.card}>
      {(checkboxValue != null) && (
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
        onClick={() => onClickConnector && onClickConnector({ id, target: 'left' })}
        className={classes['connector-left']}
      >l</button>
      <button
        onClick={() => onClickConnector && onClickConnector({ id, target: 'right' })}
        className={classes['connector-right']}
      >r</button>
    </div>
  );
};

export default IdeaListItem;
