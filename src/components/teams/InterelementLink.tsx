import React, { FC } from "react";

interface IInterelementLink {
  leftItemId: string;
  rightItemId: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  emphasized?: true;
}

const InterelementLink: FC<IInterelementLink> = (/* props */) => {
  return <></>;
};

export default InterelementLink;
