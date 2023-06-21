import style from "./TeamSelector.module.scss";
import { useState } from "react";

interface ITeamSelectorProps {
  belongs: {
    id: string;
    name: string;
  }[];
  onClickTeam: (event: { team: { id: string; name: string } }) => void;
  onJoinTeam: (event: { invitationCode: string }) => void;
  onEnterNewTeam: (event: { name: string }) => void;
}

export const TeamSelector = ({
  belongs,
  onClickTeam,
  onJoinTeam,
  onEnterNewTeam,
}: ITeamSelectorProps) => {
  const [invitationCode, setInvitationCode] = useState("");
  const [teamName, setTeamName] = useState("");

  const handleClickJoin = () => {
    if (invitationCode !== "") {
      onJoinTeam({ invitationCode });
    }
  };
  const handleClickCreate = () => {
    if (teamName !== "") {
      onEnterNewTeam({ name: teamName });
    }
  };
  return (
    <div className={style.container}>
      <h1 className={style.title}>技術COMPへようこそ!</h1>
      {belongs.length > 0 ? (
        <>
          <h2 className={style.subTitle}>既存のチームに参加</h2>
          <div className={style.teamList}>
            {belongs.map((team) => (
              <a
                key={team.id}
                className={style.teamListItem}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onClickTeam({ team });
                }}
              >
                {team.name}
              </a>
            ))}
          </div>
        </>
      ) : (
        <p>
          チームで参加するハッカソンのアイディア出しをサポートします!
          <br />
          まずはあなたのチームのアイディア出しの準備をしましょう。
        </p>
      )}
      <h2 className={style.subTitle}>
        <img src="/assets/join-team.svg" alt="チームに参加" />
        既存のチームに参加
      </h2>
      <div className={style.formContainer}>
        <input
          type="text"
          placeholder="#code"
          className={style.input}
          value={invitationCode}
          onChange={(e) => setInvitationCode(e.target.value)}
        />
        <button className={style.button} onClick={handleClickJoin}>
          チームに参加
        </button>
      </div>
      <h2 className={style.subTitle}>
        <img src="/assets/add.svg" alt="新しいチームを作成" />{" "}
        新しいチームを作成
      </h2>
      <div className={style.formContainer}>
        <input
          type="text"
          placeholder="チーム名"
          className={style.input}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <button className={style.button} onClick={handleClickCreate}>
          チームを作成
        </button>
      </div>
    </div>
  );
};
