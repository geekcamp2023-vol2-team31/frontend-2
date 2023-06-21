import { IPutUsersMeBody } from "@/@types/user/IPutUsersMeBody";
import { requests } from "../../../utils/requests";
import style from "./Account.module.scss";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export const Account = ({
  onClickDeleteAccount,
}: {
  onClickDeleteAccount?: () => void;
}) => {
  const getUsersMe = () => {
    return requests("/users/me") as unknown as IPutUsersMeBody;
  };
  const query = useQuery({
    queryKey: ["users", "me"],
    queryFn: getUsersMe,
  });

  return (
    <div className={style.container}>
      <h1 className={style.title}>プロフィールとアカウント</h1>
      <p>
        <strong>{query.data?.user.name}</strong>としてログイン中
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
