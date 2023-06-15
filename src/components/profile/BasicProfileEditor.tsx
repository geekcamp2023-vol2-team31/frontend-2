import { requests } from "../../utils/requests";
import style from "./BasicProfileEditor.module.css";
import { FC, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IPutUsersMeBody } from "@/@types/user/IPutUsersMeBody";

export const BasicProfileEditor: FC = () => {
  const displayName = useRef<HTMLInputElement>(null);
  const selfIntroduction = useRef<HTMLTextAreaElement>(null);

  const getUsersMe = () => {
    return requests("/users/me") as unknown as IPutUsersMeBody;
  };
  const query = useQuery({
    queryKey: ["users", "me"],
    queryFn: getUsersMe,
  });

  const postUsersMe = (body: IPutUsersMeBody) => {
    return requests(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  };
  const mutation = useMutation({ mutationFn: postUsersMe });
  const onSubmit = () => {
    mutation.mutate({
      user: {
        name: displayName.current?.value ?? "",
        bio: selfIntroduction.current?.value ?? "",
        icon: "",
        techs: [],
      },
    });
  };

  useEffect(() => {
    if (displayName.current)
      displayName.current.value = query.data?.user.name ?? "";
    if (selfIntroduction.current)
      selfIntroduction.current.value = query.data?.user.bio ?? "";
  }, [query.data?.user.bio, query.data?.user.name]);

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
          <input type="text" ref={displayName} />
        </label>
      </div>
      <div className={style.input}>
        <label htmlFor="" className={style.label}>
          <span>自己紹介</span>
          <textarea ref={selfIntroduction} />
        </label>
      </div>
      <div>
        <div className={style.buttonContainer}>
          <button className={style.undo}>変更を戻す</button>
          <button onClick={onSubmit} className={style.save}>
            変更を保存
          </button>
        </div>
      </div>
    </div>
  );
};
