import React, { FC } from "react";

interface IInterelementFrame {
  ids: string[];
  frames: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
}

const InterelementFrame: FC<IInterelementFrame> = (/* props */) => {
  return <></>;
};

export default InterelementFrame;
