import React, { FC } from "react";
import styles from "./InterelementFrame.module.css";

interface IInterelementFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

const InterelementFrame: FC<IInterelementFrame> = ({ x, y, width, height }) => {
  const padding = 10;
  return (
    <div
      style={{
        width: `${width + 2 * padding}px`,
        height: `${height + 2 * padding}px`,
        left: `${x}px`,
        top: `${y}px`,
      }}
      className={styles.frame}
    ></div>
  );
};

export default InterelementFrame;
