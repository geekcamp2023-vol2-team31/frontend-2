import Styles from "./section-2.module.scss";
import { Section2Image1 } from "@/assets/lp/section-2-image-1";
import { Section2Image2 } from "@/assets/lp/section-2-image-2";
import { Section2Image3 } from "@/assets/lp/section-2-image-3";

const Section2 = () => {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.card}>
        <p className={Styles.text}>
          困っている事、
          <wbr />
          解決したい課題を共有
        </p>
        <Section2Image1 className={Styles.image} />
      </div>
      <div className={Styles.card}>
        <p className={Styles.text}>
          メンバーの技術の
          <wbr />
          習熟度を確認しながら技術選定
        </p>
        <Section2Image2 className={Styles.image} />
      </div>
      <div className={Styles.card}>
        <p className={Styles.text}>
          あなたのアイデアを
          <wbr />
          気軽にシェア
        </p>
        <Section2Image3 className={Styles.image} />
      </div>
    </div>
  );
};

export { Section2 };
