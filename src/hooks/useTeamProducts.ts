import { ITeamProductPutBody } from "@/@types/team/products/ITeamProductPutBody";
import { ITeamProductsGetResponse } from "@/@types/team/products/ITeamProductsGetResponse";
import { ITeamProductsPostBody } from "@/@types/team/products/ITeamProductsPostBody";
import { ITeamProductsPostResponse } from "@/@types/team/products/ITeamProductsPostResponse";
import { escape } from "@/utils/escape";
import { intersection } from "@/utils/intersection";
import { queryClient } from "@/utils/queryClient";
import { requests } from "@/utils/requests";
import { useMutation, useQuery } from "@tanstack/react-query";

type TUseTeamProducts = (teamId: string) => {
  data: ITeamProductsGetResponse | undefined;
  setData: (data: ITeamProductsGetResponse) => void;
  isLoading: boolean;
};

export const useTeamProducts: TUseTeamProducts = (teamId) => {
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

  // query: データ取得のサポート
  const { data, isLoading } = useQuery<ITeamProductsGetResponse>({
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

      const oldIds = data.products.map((product) => product.id);
      const oldIdsSet = new Set(oldIds);
      const newIdsSet = new Set(newData.products.map((product) => product.id));

      // 古いリストにあって新しいリストにない項目は削除する。
      for (const id of oldIds) {
        if (newIdsSet.has(id) === false) {
          await deleteProduct(id);
        }
      }

      for (const product of newData.products) {
        // 古いリストにない項目は追加する。
        if (oldIdsSet.has(product.id) === false) {
          await postProduct({ product });
          continue;
        }

        // 変更のない項目はそのままにする。
        // 共通集合をとって長さが違えば、配列が変更されているといえる。
        const oldProduct = data.products.find(
          (olProduct) => product.id === olProduct.id
        );
        if (
          oldProduct === undefined ||
          (oldProduct.name === product.id &&
            intersection(oldProduct.comments, product.comments).length ===
              oldProduct.comments.length &&
            intersection(
              oldProduct.techs.map((tech) => tech.name),
              product.techs.map((tech) => tech.name)
            ).length === oldProduct.techs.length)
        ) {
          continue;
        }

        // 変更のある項目は変更する。
        await putProduct(product.id, { product });
      }

      return newData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["teams", teamId, "products"], data);
    },
  });

  const setData = (data: ITeamProductsGetResponse) => {
    mutation.mutate(data);
  };

  return { data, isLoading, setData };
};
