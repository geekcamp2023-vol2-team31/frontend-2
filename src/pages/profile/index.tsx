import { useRouter } from "next/router";
import { Header } from "@/components/common/header/Header";
import { BasicProfileEditor } from "@/components/profile/BasicProfileEditor";
import { TechProfileEditor } from "@/components/profile/TechProfileEditor";
import style from "./Profile.module.scss";

const Profile = () => {
  const router = useRouter();

  // ページの種類 未指定の場合基本プロフィールを表示する
  const type: "basic" | "tech" =
    router.query.type === "basic" || router.query.type === "tech"
      ? router.query.type
      : "basic";

  return (
    <div>
      <Header
        title="プロフィールの編集"
        onHomeButtonClick={() => void router.push("/home")}
      />
      <div className={style.container}>
        <div>
          <h2>プロフィールを更新しましょう</h2>
          <p>
            最近のマイブームや、前回のハッカソンで身に付けた技術をプロフィールに反映させましょう。
          </p>
          {type === "basic" ? (
            <button
              className={style.toggleButton}
              onClick={() => void router.push("/profile?type=tech")}
            >
              技術スタックを編集する
            </button>
          ) : (
            <button
              className={style.toggleButton}
              onClick={() => void router.push("/profile?type=basic")}
            >
              基本プロフィールを編集する
            </button>
          )}
        </div>
        {type === "basic" ? <BasicProfileEditor /> : <TechProfileEditor />}
      </div>
    </div>
  );
};

export default Profile;
