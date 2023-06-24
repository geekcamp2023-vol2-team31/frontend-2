import { ITeamProductPutBody } from "@/@types/team/products/ITeamProductPutBody";
import { ITeamProductsGetResponse } from "@/@types/team/products/ITeamProductsGetResponse";
import { ITeamProductsPostBody } from "@/@types/team/products/ITeamProductsPostBody";
import { ITeamProductsPostResponse } from "@/@types/team/products/ITeamProductsPostResponse";
import { escape } from "@/utils/escape";
import { intersection } from "@/utils/intersection";
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
          (oldProduct) => product.id === oldProduct.id
        );
        const commentsIntersection = intersection(
          oldProduct?.comments ?? [],
          product.comments
        );
        const techsIntersection = intersection(
          oldProduct?.techs ?? [],
          product.techs
        );
        if (
          oldProduct === undefined ||
          (oldProduct.name === product.id &&
            commentsIntersection.length === oldProduct.comments.length &&
            commentsIntersection.length === product.comments.length &&
            techsIntersection.length === oldProduct.techs.length &&
            techsIntersection.length === product.techs.length)
        ) {
          continue;
        }

        // 変更のある項目は変更する。
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
