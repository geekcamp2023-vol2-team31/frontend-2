import { FC, ReactNode, useRef } from "react";
import style from "./NewChip.module.scss";

export interface INewChip {
  id: string;
  onEnter?: (event: INewChipEnterEvent) => void;
  children: ReactNode;
}

interface INewChipEnterEvent {
  id: string; // propsからもらったid
  label: string; // 入力された内容
}

export const NewChip: FC<INewChip> = ({ id, onEnter, children }) => {
  const skillNameRef = useRef<HTMLInputElement>(null);
  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && onEnter)
      onEnter({ id, label: skillNameRef.current?.value ?? "" });
  };
  const handleClick = () => {
    if (onEnter) onEnter({ id, label: skillNameRef.current?.value ?? "" });
  };

  return (
    <div className={style.container}>
      <div className={style.inputContainer}>
        <input
          type="text"
          placeholder="追加"
          ref={skillNameRef}
          onKeyDown={handleEnter}
          className={style.input}
        />
        <button onClick={handleClick} className={style.buttonContainer}>
          {children}
        </button>
      </div>
    </div>
  );
};
