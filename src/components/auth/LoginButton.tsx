import React from "react";
import style from "./LoginButton.module.css";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button onClick={() => void signIn("github")} className={style.button}>
      <img
        src="./assets/github-icon.svg"
        width={25}
        height={25}
        alt="GitHubのアイコン"
      />
      GitHubでログインする
    </button>
  );
};
