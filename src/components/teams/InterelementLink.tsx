import React, { FC, useEffect, useRef } from "react";
// const width= 100000
// const height = 100000
interface IInterelementLink {
  leftItemId: string;
  rightItemId: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  emphasized: boolean;
}

const InterelementLink: FC<IInterelementLink> = (props) => {
  const { /*leftItemId, rightItemId,*/ x0, y0, x1, y1, emphasized } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) {
      throw new Error("objectがnull");
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("context取得失敗");
    }

    ctx.strokeStyle = "#black";
    emphasized ? (ctx.lineWidth = 10) : (ctx.lineWidth = 1);
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }, [emphasized]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={10000}
        height={10000}
        style={{ position: "absolute", pointerEvents: "none" }}
      />
    </div>
  );
};

export default InterelementLink;
