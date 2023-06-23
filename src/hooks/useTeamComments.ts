import { ITeamCommentPutBody } from "@/@types/team/comments/ITeamCommentPutBody";
import { ITeamCommentsGetResponse } from "@/@types/team/comments/ITeamCommentsGetResponse";
import { ITeamCommentsPostBody } from "@/@types/team/comments/ITeamCommentsPostBody";
import { ITeamCommentsPostResponse } from "@/@types/team/comments/ITeamCommentsPostResponse";
import { escape } from "@/utils/escape";
import { requests } from "@/utils/requests";
import { useMutation, useQuery } from "@tanstack/react-query";

type ElementOf<T> = T extends (infer U)[] ? U : never;

type ITeamCommentsGetResponseWithoutNext = {
  comments: Omit<ElementOf<ITeamCommentsGetResponse["comments"]>, "next">[];
};

type TUseTeamComments = (teamId: string) => {
  data: ITeamCommentsGetResponseWithoutNext | undefined;
  setData: (data: ITeamCommentsGetResponseWithoutNext) => void;
  isLoading: boolean;
};

export const useTeamComments: TUseTeamComments = (teamId) => {
  const url = `/teams/${escape(teamId)}/comments`;

  const getComments = () => requests<ITeamCommentsGetResponse>(url);
  const postComment = (data: ITeamCommentsPostBody) =>
    requests<ITeamCommentsPostResponse>(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  const putComment = (commentId: string, data: ITeamCommentPutBody) =>
    requests<unknown>(`${url}/${commentId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  const deleteComment = (commentId: string) =>
    requests<unknown>(`${url}/${commentId}`, {
      method: "DELETE",
    });

  // query: データ取得のサポート
  const { data, isLoading, refetch } = useQuery<ITeamCommentsGetResponse>({
    queryKey: ["teams", teamId, "comments"],
    queryFn: getComments,
  });

  // mutation: データ更新のサポート
  const mutation = useMutation<
    ITeamCommentsGetResponse,
    unknown,
    ITeamCommentsGetResponseWithoutNext
  >({
    mutationFn: async (newData) => {
      if (data === undefined) {
        return newData;
      }

      const oldComments = data.comments;
      const newComments = newData.comments;
      const oldIds = oldComments.map((comment) => comment.id);
      const newIds = newComments.map((comment) => comment.id);
      const oldIdsSet = new Set(oldIds);
      const newIdsSet = new Set(newIds);

      // 古いリストにあって新しいリストにない項目は削除する。
      for (const id of oldIds) {
        if (newIdsSet.has(id) === false) {
          await deleteComment(id);
        }
      }

      // 新しいリストにあって古いリストにない項目は追加する。
      for (const comment of newComments) {
        if (oldIdsSet.has(comment.id) === false) {
          await postComment({ comment });
        }
      }

      const oldCommentsWithNextMap = new Map(
        oldComments.map<[string, ITeamCommentsGetResponse["comments"][number]]>(
          (comment) => [comment.id, comment]
        )
      );
      const newCommentsWithNext = newComments.map<ITeamCommentsGetResponse["comments"][number]>(
        (comment, idx) => {
          const next = newComments[idx]?.id;
          if (next === undefined) {
            return { ...comment, next: undefined };
          }
          return { ...comment, next };
        }
      );

      for (const comment of newCommentsWithNext) {
        const oldComment = oldCommentsWithNextMap.get(comment.id);

        // 変更のない項目はそのままにする。
        if (
          oldComment === undefined ||
          (
            oldComment.next === comment.next
            && oldComment.body === comment.body
            && oldComment.type === comment.type
          )
        ) {
          continue;
        }

        // 変更のある項目は変更する。
        await putComment(comment.id, { comment });
      }

      return newData;
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  const setData = (data: ITeamCommentsGetResponse) => {
    mutation.mutate(data);
  };

  return { data, isLoading, setData };
};
