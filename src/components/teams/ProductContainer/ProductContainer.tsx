import { FC, useMemo } from "react";
import style from "./ProductContainer.module.scss";
import { CloseIcon } from "@/assets/close";
import TechListItem from "../TechListItem/TechListItem";
import { requests } from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { useIsSidebarOpen } from "@/store/isSidebarOpen";
import { ITeamGetResponse } from "@/@types/team/ITeamGetResponse";
import { ITeamProductsGetResponse } from "@/@types/team/products/ITeamProductsGetResponse";
import { useTeamProducts } from "@/hooks/useTeamProducts";
import { useTeam } from "@/hooks/useTeam";

type Props = {
  productId: string;
  teamId: string;
};

type MemberHasTechs = {
  [key: string]: {
    userName: string;
    userToTech: ITeamGetResponse["team"]["owner"]["userToTechs"];
  }[];
};

export type Tech = {
  icon?: string | undefined;
  color?: string | undefined;
  name: string;
};

export const ProductContainer: FC<Props> = ({ productId, teamId }) => {
  const { data: teamProductsData, setData: setTeamProductsData } =
    useTeamProducts(teamId);
  const { data: teamData } = useTeam(teamId);

  const teamMember = useMemo(() => {
    return teamData && teamData.team.members
      ? [teamData?.team.owner, ...teamData.team.members]
      : [];
  }, [teamData]);

  const techProficiency = useMemo(() => {
    const hashmap: MemberHasTechs = {};
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

  const handleTechProficiency = (tech: Tech) => {
    if (teamProductsData && teamProductsData.products) {
      const copyProducts = [...teamProductsData.products];
      const copyTeamProductsData = { ...teamProductsData };
      copyProducts;
      // 引数のtechを該当プロダクトから削除
      const copyProduct = { ...product };
      copyProduct.techs?.filter((copyTech) => copyTech.name === tech.name);
      copyTeamProductsData.products = copyProducts;
      setTeamProductsData(copyTeamProductsData);
    }
  };

  const handleMemberHasTech = (tech: Tech) => {
    if (teamProductsData && teamProductsData.products) {
      const copyProducts = [...teamProductsData.products];
      const copyTeamProductsData = { ...teamProductsData };
      copyProducts;
      // 現在選択されているプロダクトをcopyProductsから取り除き、useMemoのproductから
      copyProducts.filter((copyProduct) => copyProduct.id === product?.id);
      const copyProduct = { ...product };
      copyProduct.techs?.push(tech);
      copyTeamProductsData.products = copyProducts;
      setTeamProductsData(copyTeamProductsData);
    }
  };

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
                onActionClick={() => handleTechProficiency(tech)}
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
                onActionClick={() =>
                  handleMemberHasTech(
                    techProficiency[techKey][0].userToTech.tech
                  )
                }
              />
            );
          })}
        </div>
      </div>

      <button className={style.deleteButton}>技術COMPを削除</button>
    </div>
  );
};
