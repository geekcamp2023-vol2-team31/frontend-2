import React, { useEffect } from "react";
import style from "./LoginButton.module.css";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

export const LoginButton = () => {
  const { data: session } = useSession();
  const token = session?.user.accessToken as string;
  const { setData } = useAuth(token);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setData(token);
      void router.push("/home");
    }
  }, [session, router]);
  const handleClick = async () => {
    try {
      await signIn("github");
    } catch (error) {
      toast.error("ログインに失敗しました。");
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
