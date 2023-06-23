import { useUsersMe } from "@/hooks/useUsersMe";
import Link from "next/link";
import style from "./Account.module.scss";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export const Account = ({
  onClickDeleteAccount,
}: {
  onClickDeleteAccount?: () => void;
}) => {
  const { data } = useUsersMe();
  const router = useRouter();
  const onLogout = () => {
    void (async () => {
      await signOut({ redirect: false });
      await router.push("/");
    })();
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>プロフィールとアカウント</h1>
      <p>
        <strong>{data?.user.name}</strong>としてログイン中
      </p>
      <div className={style.buttonContainer}>
        <Link href="/profile" className={style.button}>
          プロフィールの編集
        </Link>
        <button className={style.button} onClick={onLogout}>
          ログアウト
        </button>
        <button
          className={style.button}
          onClick={() => onClickDeleteAccount && onClickDeleteAccount()}
        >
          アカウントの削除
        </button>
      </div>
    </div>
  );
};
