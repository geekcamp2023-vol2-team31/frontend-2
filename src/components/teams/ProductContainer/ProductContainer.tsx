import { FC, useMemo } from "react";
import style from "./ProductContainer.module.scss";
import { CloseIcon } from "@/assets/close";
import TechListItem from "../TechListItem/TechListItem";
import { requests } from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { useIsSidebarOpen } from "@/store/isSidebarOpen";
import { ITeamGetResponse } from "@/@types/team/ITeamGetResponse";
import { ITeamProductsGetResponse } from "@/@types/team/products/ITeamProductsGetResponse";

type Props = {
  productId: string;
  teamId: string;
};

export const ProductContainer: FC<Props> = ({ productId, teamId }) => {
  const getTeam: () => Promise<ITeamGetResponse> = () =>
    requests(`/teams/${teamId}`);
  const { data: teamData } = useQuery<ITeamGetResponse>(["teams"], getTeam);
  const teamMember = useMemo(() => {
    return teamData && teamData.team.members
      ? [...teamData.team.members, teamData.team.owner]
      : [];
  }, [teamData]);
  const techProficiency = useMemo(() => {
    const hashmap: {
      [key: string]: {
        userName: string;
        userToTech: ITeamGetResponse["team"]["owner"]["userToTechs"];
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

  const getProducts: () => Promise<ITeamProductsGetResponse> = () =>
    requests(`/products`);
  const { data: productsData } = useQuery<ITeamProductsGetResponse>(
    ["products"],
    getProducts
  );

  const product = useMemo(() => {
    let selectedProductIndex = 0;
    productsData?.products.map((product, index) => {
      if (product.id === productId) selectedProductIndex = index;
    });
    return productsData?.products[selectedProductIndex];
  }, [productId, productsData?.products]);

  const toggleOpen = useIsSidebarOpen((state) => state.toggleSidebar);

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
          {product?.techs.map((tech) => {
            return (
              <TechListItem
                key={tech.name}
                id={tech.name}
                label={tech.name}
                leftSlot={
                  <div
                    style={{
                      backgroundColor:
                        techProficiency[tech.name][0].userToTech.tech.name,
                    }}
                  ></div>
                }
                users={techProficiency[tech.name]}
              />
            );
          })}
        </div>
      </div>
      <div className={style.techContainer}>
        <p className={style.title}>メンバーが持っている技術</p>
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

      <button className={style.deleteButton}>技術COMPを削除</button>
    </div>
  );
};
