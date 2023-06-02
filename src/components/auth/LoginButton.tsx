import style from "./LoginButton.module.css";
export const LoginButton = () => {
  return (
    <button className={style.button}>
      <img
        src="/assets/github-icon.svg"
        width={25}
        height={25}
        alt="githubのアイコン"
      />
      Githubでログインする
    </button>
  );
};
