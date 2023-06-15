import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./InterelementLink.module.css";

interface IInterelementLink {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  emphasized: boolean;
}

const InterelementLink: FC<IInterelementLink> = ({
  x0,
  y0,
  x1,
  y1,
  emphasized,
}) => {
  const margin = 10;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    setCtx(context);
  }, [canvasRef]);

  const redraw = () => {
    if (!canvasRef.current || !ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (emphasized) {
      ctx.strokeStyle = "rgba(255,0,0,1)";
      ctx.lineWidth = 5;
    } else {
      ctx.strokeStyle = "rgba(255,0,0,0.3)";
      ctx.lineWidth = 4;
    }
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(margin, Math.max(y0 - y1 + margin, margin));
    ctx.lineTo(x1 - x0 + margin, Math.max(y1 - y0 + margin, margin));
    ctx.stroke();
  };

  useEffect(redraw, [x0, y0, x1, y1, emphasized, ctx]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={x1 - x0 + 2 * margin}
        height={Math.abs(y1 - y0) + 2 * margin}
        className={styles.link}
        style={{
          left: `${x0 - margin}px`,
          top: `${Math.min(y1, y0) - margin}px`,
        }}
      />
    </div>
  );
};

export default InterelementLink;
