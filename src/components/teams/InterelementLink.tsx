import React, { FC, useEffect, useRef } from "react";
import styles from "./InterelementLink.module.css";

interface IInterelementLink {
  // leftItemId: string;
  // rightItemId: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  emphasized: boolean;
}

const InterelementLink: FC<IInterelementLink> = (props) => {
  const { /*leftItemId, rightItemId,*/ x0, y0, x1, y1, emphasized } = props;
  const margin = 10;
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
    ctx.moveTo(margin, Math.max(y0 - y1 + margin, margin));
    ctx.lineTo(x1 - x0 + margin, Math.max(y1 - y0 + margin, margin));
    ctx.stroke();
  }, [x0, y0, x1, y1, emphasized]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={x1 - x0 + 2 * margin}
        height={y1 - y0 + 2 * margin}
        className={styles.link}
        style={{ left: `${x0}px`, top: `${Math.min(y1, y0)}px` }}
      />
    </div>
  );
};

export default InterelementLink;
