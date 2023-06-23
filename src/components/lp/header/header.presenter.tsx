import Styles from "./header.module.scss";
import { HeaderImage } from "@/assets/lp/header-image";
import { Logo } from "@/assets/lp/logo";
import { LoginButton } from "@/components/auth/LoginButton";

const Header = () => {
  return (
    <div className={Styles.head}>
      <div className={Styles.bgWrapper}>
        <div className={Styles.bg} />
      </div>
      <div className={Styles.container}>
        <HeaderImage className={Styles.image} />
        <Logo className={Styles.logo} color={"white"} />
        <div className={Styles.login}>
          <p>
            GitHub アカウントで
            <br />
            すぐに始められます
          </p>
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export { Header };
