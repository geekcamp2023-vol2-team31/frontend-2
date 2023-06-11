import style from "./BasicProfileEditor.module.css";
import { FC, useRef } from "react";
// import { useMutation } from "@tanstack/react-query";

export const BasicProfileEditor: FC = () => {
  const displayName = useRef<HTMLInputElement>(null);
  const selfIntroduction = useRef<HTMLTextAreaElement>(null);
  // const mutation = useMutation({
  //   mutationFn: (newInput) => {
  //     return fetch("/users/me",  ).catch(err=>console.error(err));
  //   },
  // });
  // const onSubmit = () => { };

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
        <button className={style.save}>変更を保存</button>
      </div>
      </div>
    </div>
  );
};
