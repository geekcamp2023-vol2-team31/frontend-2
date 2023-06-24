import { Account } from "@/components/home/Account/Account";
import { Header } from "@/components/home/header/Header";
import { TeamSelector } from "@/components/home/teamSelector/TeamSelector";
import { useUsersMe } from "@/hooks/useUsersMe";
import { requests } from "@/utils/requests";
import { useRouter } from "next/router";
import style from "./home.module.scss";
import { useMemo } from "react";

const Home = () => {
  const router = useRouter();

  const { data, isLoading } = useUsersMe();

  const handleClickTeam = ({ team: { id } }: { team: { id: string } }) => {
    void router.push(`/teams/${id}`);
  };

  const handleJoinTeam = ({ invitationCode }: { invitationCode: string }) => {
    void requests<{ team: { id: string } }>(
      `/users/me/teams/${invitationCode}`,
      {
        method: "PUT",
      }
    ).then(({ team: { id } }) => {
      void router.push(`/teams/${id}`);
    });
  };

  const handleEnterNewTeam = ({ name }: { name: string }) => {
    void requests<{ team: { id: string } }>("/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        team: { name },
      }),
    }).then(({ team: { id } }) => {
      void router.push(`/teams/${id}`);
    });
  };

  const handleClickDeleteAccount = () => {
    void requests<string>("/auth", {
      method: "DELETE",
    }).then(() => {
      void router.push("/");
    });
  };

  if (isLoading || !data?.user) {
    return null;
  }
  const belongs =
    data?.user.teamsBelongs.map((team) => {
      return { id: team.id, name: team.name };
    }) || [];
  return (
    <div>
      <Header title="ようこそ!" />
      <div className={style.container}>
        <TeamSelector
          belongs={belongs ?? []}
          onClickTeam={handleClickTeam}
          onJoinTeam={handleJoinTeam}
          onEnterNewTeam={handleEnterNewTeam}
        />
        <Account onClickDeleteAccount={handleClickDeleteAccount} />
      </div>
    </div>
  );
};

export default Home;
