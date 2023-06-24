import { CloseIcon } from "@/assets/close";
import { useTeam } from "@/hooks/useTeam";
import { useTeamProducts } from "@/hooks/useTeamProducts";
import { useIsSidebarOpen } from "@/store/isSidebarOpen";
import { FC, useMemo } from "react";
import TechListItem from "../TechListItem/TechListItem";
import style from "./ProductContainer.module.scss";

type Props = {
  productId: string;
  teamId: string;
};

export const ProductContainer: FC<Props> = ({ productId, teamId }) => {
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

  const { data: productsData } = useTeamProducts(teamId);
  const product = productsData?.products.find((p) => p.id === productId);
  const productTechs = product?.techs ?? [];

  const toggleOpen = useIsSidebarOpen((state) => state.toggleOpen);

  return (
    <div className={style.container}>
      <div className={style.inputContainer}>
        <input
          type="text"
          defaultValue={product?.name}
          className={style.input}
        />
        <button className={style.closeButton} onClick={toggleOpen}>
          <CloseIcon />
        </button>
      </div>
      <div className={style.techContainer}>
        <p className={style.title}>使用予定の技術</p>
        <div className={style.techWrapper}>
          {productTechs.map((tech) => {
            return (
              <TechListItem
                key={tech.name}
                id={tech.name}
                label={tech.name}
                leftSlot={
                  <div
                    style={{ backgroundColor: tech.color ?? "#979490" }}
                  ></div>
                }
                users={membersByTechMap.get(tech.name) ?? []}
              />
            );
          })}
        </div>
      </div>
      <div className={style.techContainer}>
        <p className={style.title}>メンバーが持っている技術</p>
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

      <button className={style.deleteButton}>技術COMPを削除</button>
    </div>
  );
};
