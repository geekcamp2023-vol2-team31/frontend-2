import { useUsersMe } from "@/hooks/useUsersMe";
import Link from "next/link";
import style from "./Account.module.scss";

export const Account = ({
  onClickDeleteAccount,
}: {
  onClickDeleteAccount?: () => void;
}) => {
  const { data } = useUsersMe();

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
        <Link href="/logout" className={style.button}>
          ログアウト
        </Link>
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
