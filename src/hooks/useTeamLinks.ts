import { ITeamLinkPutBody } from "@/@types/team/links/ITeamLinkPutBody";
import { ITeamLinksGetResponse } from "@/@types/team/links/ITeamLinksGetResponse";
import { ITeamLinksPostBody } from "@/@types/team/links/ITeamLinksPostBody";
import { ITeamLinksPostResponse } from "@/@types/team/links/ITeamLinksPostResponse";
import { escape } from "@/utils/escape";
import { intersection } from "@/utils/intersection";
import { requests } from "@/utils/requests";
import { subtraction } from "@/utils/subtraction";
import { useMutation, useQuery } from "@tanstack/react-query";

type TUseTeamLinks = (teamId: string) => {
  data: ITeamLinksGetResponse | undefined;
  setData: (data: ITeamLinksGetResponse) => void;
  isLoading: boolean;
};

export const useTeamLinks: TUseTeamLinks = (teamId) => {
  type ITeamLink = ITeamLinksGetResponse["links"][number];
  const url = `/teams/${escape(teamId)}/links`;

  const getLinks = () => requests<ITeamLinksGetResponse>(url);
  const postLink = (data: ITeamLinksPostBody) =>
    requests<ITeamLinksPostResponse>(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  const putLink = (linkId: string, data: ITeamLinkPutBody) =>
    requests<unknown>(`${url}/${linkId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  const deleteLink = (linkId: string) =>
    requests<unknown>(`${url}/${linkId}`, {
      method: "DELETE",
    });

  const compareWholeFn = (a: ITeamLink, b: ITeamLink) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    if (a.leftCommentId < b.leftCommentId) return -1;
    if (a.leftCommentId > b.leftCommentId) return 1;
    if (a.rightCommentId < b.rightCommentId) return -1;
    if (a.rightCommentId > b.rightCommentId) return 1;
    return 0;
  };

  const compareIdFn = (a: ITeamLink, b: ITeamLink) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  };

  // query: データ取得のサポート
  const { data, isLoading, refetch } = useQuery<ITeamLinksGetResponse>({
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

      const oldLinks = data.links;
      const newLinks = newData.links;

      const addedLinks = subtraction(
        newLinks,
        intersection(oldLinks, newLinks, compareIdFn),
        compareIdFn
      );
      const deletedLinks = subtraction(
        oldLinks,
        intersection(oldLinks, newLinks, compareIdFn),
        compareIdFn
      );
      const changedLinks = subtraction(
        subtraction(newLinks, addedLinks, compareIdFn),
        oldLinks,
        compareWholeFn
      );

      for (const link of deletedLinks) {
        await deleteLink(link.id);
      }
      for (const link of addedLinks) {
        await postLink({ link });
      }
      for (const link of changedLinks) {
        await putLink(link.id, { link });
      }

      return newData;
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  const setData = (data: ITeamLinksGetResponse) => {
    mutation.mutate(data);
  };

  return { data, isLoading, setData };
};
