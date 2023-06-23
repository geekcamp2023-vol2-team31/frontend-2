import { CloseIcon } from "@/assets/close";
import { useTeam } from "@/hooks/useTeam";
import { useIsSidebarOpen } from "@/store/isSidebarOpen";
import { FC, useMemo } from "react";
import TechListItem from "../TechListItem/TechListItem";
import style from "./TeamSettingsContainer.module.scss";

type Props = {
  teamId: string;
};

export const TeamSettingsContainer: FC<Props> = ({ teamId }) => {
  const toggleOpen = useIsSidebarOpen((state) => state.toggleOpen);

  const { data: teamData } = useTeam(teamId);

  const members = useMemo(() => {
    return teamData && teamData.team.members
      ? [...teamData.team.members, teamData.team.owner]
      : [];
  }, [teamData]);

  const membersTech = members
    .map((user) => {
      return user.userToTechs.map((tech) => {
        return { user, userName: user.name, userToTech: tech };
      });
    })
    .flat(1);

  const membersByTechMap: Map<string, typeof membersTech> = new Map();
  membersTech.forEach((item) => {
    const mapItem = membersByTechMap.get(item.userToTech.tech.name);
    if (mapItem === undefined) {
      const newMapItem = [item];
      membersByTechMap.set(item.userToTech.tech.name, newMapItem);
      return;
    }
    mapItem.push(item);
  });

  return (
    <div className={style.container}>
      <div className={style.inputContainer}>
        <input
          type="text"
          defaultValue={teamData?.team.name}
          className={style.input}
        />
        <button className={style.closeButton} onClick={toggleOpen}>
          <CloseIcon />
        </button>
      </div>
      <div className={style.techContainer}>
        <p className={style.title}>メンバーを招待する</p>
        <p className={style.description}>
          技育COMP
          にアクセス・ログインしてから「既存のチームに参加」の入力欄に招待コードを入力してもらってください。
        </p>
        <div className={style.invitationContainer}>
          <p className={style.heading}>招待コード</p>
          <p className={style.code}>{teamData?.team.invitationCode}</p>
        </div>
      </div>
      <div className={style.techContainer}>
        <p className={style.title}>使用予定の技術</p>
        <div className={style.techWrapper}>
          {Array.from(membersByTechMap.entries()).map(([techName, members]) => {
            return (
              <TechListItem
                key={techName}
                id={techName}
                label={techName}
                leftSlot={
                  <div
                    style={{
                      backgroundColor:
                        members[0].userToTech.tech.color ?? "#979490",
                    }}
                  ></div>
                }
                users={members}
              />
            );
          })}
        </div>
      </div>
      {/* <div className={style.techContainer}>
        <p className={style.title}>メンバー</p>
        <div className={style.techWrapper}>
          {data?.team.members.map((member) => {
            return (
              <TechListItem
                key={member.id}
                id={member.id}
                label={member.name}
                leftSlot={
                  <div
                    style={{
                      backgroundColor: "red",
                    }}
                  ></div>
                }
              />
            );
          })}
        </div>
      </div> */}
    </div>
  );
};
