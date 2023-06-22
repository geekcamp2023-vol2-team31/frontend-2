import { requests } from "@/utils/requests";
import style from "./BasicProfileEditor.module.scss";
import { FC, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IPutUsersMeBody } from "@/@types/user/IPutUsersMeBody";

export const BasicProfileEditor: FC = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const getUsersMe = () => {
    return requests<IPutUsersMeBody>("/users/me");
  };
  const query = useQuery({
    queryKey: ["users", "me"],
    queryFn: getUsersMe,
  });

  const putUsersMe = (body: { user: Partial<IPutUsersMeBody["user"]> }) => {
    return requests("/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };
  const mutation = useMutation(putUsersMe);
  const onSubmit = () => {
    mutation.mutate({
      user: {
        name: name,
        bio: bio,
      },
    });
  };

  // APIデータに合わせる
  const resetInput = () => {
    if (!query.data) return;
    setName(query.data.user.name);
    setBio(query.data.user.bio);
  };

  useEffect(() => {
    if (!query.data) return;
    setName(query.data.user.name);
    setBio(query.data.user.bio);
  }, [query.data]);

  return (
    <div className={style.container}>
      <h1 className={style.title}>基本プロフィール</h1>
      <p className={style.description}>
        あなたのチームのメンバーに見せるプロフィールです。
        <br />
        自己紹介欄には GitHub等の
        URLのほか、趣味や好きなものについても書いて、会話に弾みをつけましょう!
      </p>
      <div className={style.input}>
        <label htmlFor="" className={style.label}>
          <span>名前</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div className={style.input}>
        <label htmlFor="" className={style.label}>
          <span>自己紹介</span>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
      </div>
      <div>
        <div className={style.buttonContainer}>
          <button className={style.undo} onClick={resetInput}>
            変更を戻す
          </button>
          <button onClick={onSubmit} className={style.save}>
            変更を保存
          </button>
        </div>
      </div>
    </div>
  );
};
