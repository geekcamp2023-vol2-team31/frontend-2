import Styles from "./card.module.scss";
import Image from "next/image";

type props = {
  src: string;
  username: string;
  bio: string;
};
const Card = ({ src, username, bio }: props) => {
  return (
    <div className={Styles.card}>
      <Image
        className={Styles.image}
        src={src}
        alt={username}
        width={90}
        height={90}
      />
      <div className={Styles.text}>
        <p className={Styles.name}>{username}</p>
        <p className={Styles.bio}>{bio}</p>
      </div>
    </div>
  );
};

export { Card };
