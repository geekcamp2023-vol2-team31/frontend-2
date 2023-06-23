import { ITeamCommentsGetResponse } from "@/@types/team/comments/ITeamCommentsGetResponse";
import { ITeamCommentsPostBody } from "@/@types/team/comments/ITeamCommentsPostBody";
import { ITeamCommentsPostResponse } from "@/@types/team/comments/ITeamCommentsPostResponse";
import { ITeamCommentPutBody } from "@/@types/team/comments/ITeamCommentPutBody";
import { escape } from "@/utils/escape";
import { requests } from "@/utils/requests";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/utils/queryClient";

type TUseTeamComments = (teamId: string) => {
  data: ITeamCommentsGetResponse | undefined;
  setData: (data: ITeamCommentsGetResponse) => void;
  isLoading: boolean;
};

export const useTeamComments: TUseTeamComments = (teamId) => {
  const url = `/teams/${escape(teamId)}/comments`;

  const getComments = () => requests<ITeamCommentsGetResponse>(url);
  const postComment = (data: ITeamCommentsPostBody) =>
    requests<ITeamCommentsPostResponse>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  const putComment = (commentId: string, data: ITeamCommentPutBody) =>
    requests<unknown>(`${url}/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  const deleteComment = (commentId: string) =>
    requests<unknown>(`${url}/${commentId}`, {
      method: "DELETE",
    });

  // query: データ取得のサポート
  const { data, isLoading } = useQuery<ITeamCommentsGetResponse>({
    queryKey: ["teams", teamId, "comments"],
    queryFn: getComments,
  });

  // mutation: データ更新のサポート
  const mutation = useMutation<
    ITeamCommentsGetResponse,
    unknown,
    ITeamCommentsGetResponse
  >({
    mutationFn: async (newData) => {
      if (data === undefined) {
        return newData;
      }

      const oldIds = data.comments.map((comment) => comment.id);
      const oldIdsSet = new Set(oldIds);
      const newIdsSet = new Set(newData.comments.map((comment) => comment.id));

      // 古いリストにあって新しいリストにない項目は削除する。
      for (const id of oldIds) {
        if (newIdsSet.has(id) === false) {
          await deleteComment(id);
        }
      }

      for (const comment of newData.comments) {
        // 古いリストにない項目は追加する。
        if (oldIdsSet.has(comment.id) === false) {
          await postComment({ comment });
          continue;
        }

        // 変更のない項目はそのままにする。
        const oldComment = data.comments.find(
          (oldComment) => comment.id === oldComment.id
        );
        if (
          oldComment === undefined ||
          (oldComment.body === comment.body && oldComment.type === comment.type)
        ) {
          continue;
        }

        // 変更のある項目は変更する。
        await putComment(comment.id, { comment });
      }

      return newData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["teams", teamId, "comments"], data);
    },
  });

  const setData = (data: ITeamCommentsGetResponse) => {
    mutation.mutate(data);
  };

  return { data, isLoading, setData };
};
