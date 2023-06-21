import { IPutUsersMeBody } from "@/@types/user/IPutUsersMeBody";
import { requests } from "../../../utils/requests";
import style from "./Account.module.scss";
import { useQuery } from "@tanstack/react-query";

export const Account = () => {
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
        <button className={style.button}>プロフィールの編集</button>
        <button className={style.button}>ログアウト</button>
        <button className={style.button}>アカウントの削除</button>
      </div>
    </div>
  );
};
