import { FC, useMemo } from "react";
import style from "./TeamSettingsContainer.module.scss";
import { CloseIcon } from "@/assets/close";
import TechListItem from "../TechListItem/TechListItem";
import { useQuery } from "@tanstack/react-query";
import { requests } from "@/utils/requests";
import { useIsSidebarOpen } from "@/store/isSidebarOpen";
import { ITeamGetResponse } from "@/@types/team/ITeamGetResponse";

type Props = {
  teamId: string;
};

type TeamMember = ITeamGetResponse["team"]["owner"];

export const TeamSettingsContainer: FC<Props> = ({ teamId }) => {
  const getTeam: () => Promise<ITeamGetResponse> = () =>
    requests(`/teams/${teamId}`);
  const { data } = useQuery<ITeamGetResponse>(["teams"], getTeam);
  const toggleOpen = useIsSidebarOpen((state) => state.toggleSidebar);
  const teamMember = useMemo(() => {
    return data && data.team.members
      ? [...data.team.members, data.team.owner]
      : [];
  }, [data]);

  const techProficiency = useMemo(() => {
    const hashmap: {
      [key: string]: {
        userName: string;
        userToTech: TeamMember["userToTechs"];
      }[];
    } = {};
    teamMember.map((member) => {
      hashmap[member.userToTechs.tech.name] = [
        ...hashmap[member.userToTechs.tech.name],
        { userToTech: member.userToTechs, userName: member.name },
      ];
    });
    return hashmap;
  }, [teamMember]);

  return (
    <div className={style.container}>
      <div className={style.inputContainer}>
        <input
          type="text"
          defaultValue={data?.team.name}
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
          <p className={style.code}>{data?.team.invitationCode}</p>
        </div>
      </div>
      <div className={style.techContainer}>
        <p className={style.title}>使用予定の技術</p>
        <div className={style.techWrapper}>
          {Object.keys(techProficiency).map((techKey) => {
            return (
              <TechListItem
                key={techKey}
                id={techKey}
                label={techKey}
                leftSlot={
                  <div
                    style={{
                      backgroundColor:
                        techProficiency[techKey][0].userToTech.tech.name,
                    }}
                  ></div>
                }
                users={techProficiency[techKey]}
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
