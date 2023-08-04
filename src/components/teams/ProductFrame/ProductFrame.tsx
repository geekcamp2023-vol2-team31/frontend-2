import InterelementFrame from "../InterelementFrame";
import style from "./ProductFrame.module.scss";

interface IProductFrame {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onClick: (event: { id: string }) => void;
}

export const ProductFrame = ({
  id,
  label,
  x,
  y,
  width,
  height,
  onClick,
}: IProductFrame) => (
  <div className={style.container}>
    <button
      className={style.label}
      style={{ top: `${y - 35}px`, left: `${x + width - 70}px` }}
      onClick={() => onClick({ id })}
    >
      {label}
    </button>
    <InterelementFrame x={x} y={y} width={width} height={height} />
  </div>
);
