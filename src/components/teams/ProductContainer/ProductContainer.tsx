import { FC } from "react";
import style from "./ProductContainer.module.scss";

type Props = {
  productId: string;
  teamId: string;
};

export const ProductContainer: FC<Props> = () => {
  return <div className={style.container}></div>;
};
