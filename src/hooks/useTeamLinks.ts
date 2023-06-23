import { ITeamLinkPutBody } from "@/@types/team/links/ITeamLinkPutBody";
import { ITeamLinksGetResponse } from "@/@types/team/links/ITeamLinksGetResponse";
import { ITeamLinksPostBody } from "@/@types/team/links/ITeamLinksPostBody";
import { ITeamLinksPostResponse } from "@/@types/team/links/ITeamLinksPostResponse";
import { escape } from "@/utils/escape";
import { queryClient } from "@/utils/queryClient";
import { requests } from "@/utils/requests";
import { useMutation, useQuery } from "@tanstack/react-query";

type TUseTeamLinks = (teamId: string) => {
  data: ITeamLinksGetResponse | undefined;
  setData: (data: ITeamLinksGetResponse) => void;
  isLoading: boolean;
};

export const useTeamLinks: TUseTeamLinks = (teamId) => {
  const url = `/teams/${escape(teamId)}/links`;

  const getLinks = () => requests<ITeamLinksGetResponse>(url);
  const postLink = (data: ITeamLinksPostBody) =>
    requests<ITeamLinksPostResponse>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  const putLink = (linkId: string, data: ITeamLinkPutBody) =>
    requests<unknown>(`${url}/${linkId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  const deleteLink = (linkId: string) =>
    requests<unknown>(`${url}/${linkId}`, {
      method: "DELETE",
    });

  // query: データ取得のサポート
  const { data, isLoading } = useQuery<ITeamLinksGetResponse>({
    queryKey: ["teams", teamId, "links"],
    queryFn: getLinks,
  });

  // mutation: データ更新のサポート
  const mutation = useMutation<
    ITeamLinksGetResponse,
    unknown,
    ITeamLinksGetResponse
  >({
    mutationFn: async (newData) => {
      if (data === undefined) {
        return newData;
      }

      const oldIds = data.links.map((link) => link.id);
      const oldIdsSet = new Set(oldIds);
      const newIdsSet = new Set(newData.links.map((link) => link.id));

      // 古いリストにあって新しいリストにない項目は削除する。
      for (const id of oldIds) {
        if (newIdsSet.has(id) === false) {
          await deleteLink(id);
        }
      }

      for (const link of newData.links) {
        // 古いリストにない項目は追加する。
        if (oldIdsSet.has(link.id) === false) {
          await postLink({ link });
          continue;
        }

        // 変更のない項目はそのままにする。
        const oldLink = data.links.find((oldLink) => link.id === oldLink.id);
        if (
          oldLink === undefined ||
          (oldLink.leftCommentId === link.leftCommentId &&
            oldLink.rightCommentId === oldLink.rightCommentId)
        ) {
          continue;
        }

        // 変更のある項目は変更する。
        await putLink(link.id, { link });
      }

      return newData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["teams", teamId, "links"], data);
    },
  });

  const setData = (data: ITeamLinksGetResponse) => {
    mutation.mutate(data);
  };

  return { data, isLoading, setData };
};
