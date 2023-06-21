import Styles from "./header.module.scss";
import { HeaderImage } from "@/assets/lp/header-image";
import { Logo } from "@/assets/lp/logo";
import { GithubLogo } from "@/assets/lp/github-logo";

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
          <button className={Styles.button}>
            <GithubLogo className={Styles.github} />
            GitHub でログイン
          </button>
        </div>
      </div>
    </div>
  );
};

export { Header };
