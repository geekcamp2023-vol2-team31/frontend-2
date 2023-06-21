import { Section1Image } from "@/assets/lp/section-1-image";
import Styles from "./section-1.module.scss";

const Section1 = () => {
  return (
    <div className={Styles.wrapper}>
      <p className={Styles.text}>
        ハッカソンのアイデア出しに
        <br />
        困ることはありませんか？
      </p>
      <Section1Image className={Styles.image} />
    </div>
  );
};

export { Section1 };
