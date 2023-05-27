import React, { FC, useEffect, useRef } from "react";

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    emphasized
      ? (ctx.strokeStyle = "rgba(255,0,0,1)")
      : (ctx.strokeStyle = "rgba(255,0,0,0.3)");
    emphasized ? (ctx.lineWidth = 7) : (ctx.lineWidth = 5);
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }, [x0, y0, x1, y1, emphasized]);

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
