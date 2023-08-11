import { ITeamProductPutBody } from "@/@types/team/products/ITeamProductPutBody";
import { ITeamProductsGetResponse } from "@/@types/team/products/ITeamProductsGetResponse";
import { ITeamProductsPostBody } from "@/@types/team/products/ITeamProductsPostBody";
import { ITeamProductsPostResponse } from "@/@types/team/products/ITeamProductsPostResponse";
import { escape } from "@/utils/escape";
import { intersection } from "@/utils/intersection";
import { requests } from "@/utils/requests";
import { subtraction } from "@/utils/subtraction";
import { useMutation, useQuery } from "@tanstack/react-query";

type TUseTeamProducts = (teamId: string) => {
  data: ITeamProductsGetResponse | undefined;
  setData: (data: ITeamProductsGetResponse) => void;
  isLoading: boolean;
};

export const useTeamProducts: TUseTeamProducts = (teamId) => {
  type ITeamProduct = ITeamProductsGetResponse["products"][number];

  const url = `/teams/${escape(teamId)}/products`;

  const getProducts = () => requests<ITeamProductsGetResponse>(url);
  const postProduct = (data: ITeamProductsPostBody) =>
    requests<ITeamProductsPostResponse>(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  const putProduct = (productId: string, data: ITeamProductPutBody) =>
    requests<unknown>(`${url}/${productId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  const deleteProduct = (productId: string) =>
    requests<unknown>(`${url}/${productId}`, {
      method: "DELETE",
    });

  const compareWholeFn = (a: ITeamProduct, b: ITeamProduct) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    if (a.comments.length < intersection(a.comments, b.comments).length)
      return -1;
    if (b.comments.length < intersection(a.comments, b.comments).length)
      return 1;
    if (a.techs.length < intersection(a.techs, b.techs).length) return -1;
    if (b.techs.length < intersection(a.techs, b.techs).length) return 1;
    return 0;
  };

  const compareIdFn = (a: ITeamProduct, b: ITeamProduct) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  };

  // query: データ取得のサポート
  const { data, isLoading, refetch } = useQuery<ITeamProductsGetResponse>({
    queryKey: ["teams", teamId, "products"],
    queryFn: getProducts,
  });

  // mutation: データ更新のサポート
  const mutation = useMutation<
    ITeamProductsGetResponse,
    unknown,
    ITeamProductsGetResponse
  >({
    mutationFn: async (newData) => {
      if (data === undefined) {
        return newData;
      }

      const oldProducts = data.products;
      const newProducts = newData.products;

      const addedProducts = subtraction(
        newProducts,
        intersection(oldProducts, newProducts, compareIdFn),
        compareIdFn
      );
      const deletedProducts = subtraction(
        oldProducts,
        intersection(oldProducts, newProducts, compareIdFn),
        compareIdFn
      );
      const changedProducts = subtraction(
        subtraction(newProducts, addedProducts, compareIdFn),
        oldProducts,
        compareWholeFn
      );

      for (const product of deletedProducts) {
        await deleteProduct(product.id);
      }
      for (const product of addedProducts) {
        await postProduct({ product });
      }
      for (const product of changedProducts) {
        await putProduct(product.id, { product });
      }

      return newData;
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  const setData = (data: ITeamProductsGetResponse) => {
    mutation.mutate(data);
  };

  return { data, isLoading, setData };
};
