import React, { FC, useEffect, useRef } from "react";
import styles from "./InterelementFrame.module.css";

interface IInterelementFrame {
  // ids: string[];
  // frames: {
  x: number;
  y: number;
  width: number;
  height: number;
  // }[];
}

const InterelementFrame: FC<IInterelementFrame> = (props) => {
  const { x, y, width, height } = props;
  const margin = 10;
  const padding = 10;
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
    ctx.strokeStyle = "rgba(255,0,0,1)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(margin, padding + margin);
    ctx.quadraticCurveTo(margin, margin, padding + margin, margin);
    ctx.lineTo(width + padding + margin, margin);
    ctx.quadraticCurveTo(
      width + 2 * padding + margin,
      margin,
      width + 2 * padding + margin,
      padding + margin
    );
    ctx.lineTo(width + 2 * padding + margin, height + padding + margin);
    ctx.quadraticCurveTo(
      width + 2 * padding + margin,
      height + 2 * padding + margin,
      width + padding + margin,
      height + 2 * padding + margin
    );
    ctx.lineTo(padding + margin, height + 2 * padding + margin);
    ctx.quadraticCurveTo(
      margin,
      height + 2 * padding + margin,
      margin,
      height + padding + margin
    );
    ctx.lineTo(margin, padding + margin);
    ctx.stroke();
  }, [x, y, width, height]);
  return (
    <>
      <canvas
        ref={canvasRef}
        width={width + 2 * margin + 2 * padding}
        height={height + 2 * margin + 2 * padding}
        className={styles.frame}
        style={{
          left: `${x - padding - margin}px`,
          top: `${y - padding - margin}px`,
        }}
      />
    </>
  );
};

export default InterelementFrame;
