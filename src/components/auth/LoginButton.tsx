import React from "react";
import style from "./LoginButton.module.css";
import { signIn, useSession } from "next-auth/react";
import { requests } from "@/utils/requests";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginButton = () => {
  const { data: session } = useSession();
  const notify = () => toast.error("ログインに失敗しました。");
  const token = session?.user.accessToken as string;
  const handleClick = async () => {
    try {
      await signIn("github");
      await requests("/auth", {
        body: JSON.stringify(token),
      });
    } catch (error) {
      notify();
    }
  };

  return (
    <>
      <button onClick={handleClick as () => void} className={style.button}>
        <img
          src="./assets/github-icon.svg"
          width={25}
          height={25}
          alt="GitHubのアイコン"
        />
        GitHubでログインする
      </button>
    </>
  );
};
