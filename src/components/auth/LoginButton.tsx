import { GithubLogo } from "@/assets/lp/github-logo";
import style from "./LoginButton.module.css";
export const LoginButton = () => {
  return (
    <button
      className={style.button}
      onClick={() => {
        console.log("あああ");
      }}
    >
      <GithubLogo className={style.github} />
      GitHubでログインする
    </button>
  );
};
