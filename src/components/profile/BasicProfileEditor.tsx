import { useUsersMe } from "@/hooks/useUsersMe";
import style from "./BasicProfileEditor.module.scss";
import { FC, useState } from "react";

export const BasicProfileEditor: FC = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const { data, setData } = useUsersMe();

  const resetInput = () => {
    if (!data) return;
    setName(data.user.name);
    setBio(data.user.bio);
  };

  const onSubmit = () => {
    if (!data) return;
    setData({
      user: { ...data.user, name, bio },
    });
  };

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
