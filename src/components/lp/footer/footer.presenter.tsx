import { Logo } from "@/assets/lp/logo";
import Styles from "./footer.module.scss";

const Footer = () => {
  return (
    <div className={Styles.footer}>
      <Logo className={Styles.logo} color={"white"} />
    </div>
  );
};

export { Footer };
