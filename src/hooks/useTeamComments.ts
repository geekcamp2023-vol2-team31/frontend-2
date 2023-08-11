import { ITeamCommentPutBody } from "@/@types/team/comments/ITeamCommentPutBody";
import { ITeamCommentsGetResponse } from "@/@types/team/comments/ITeamCommentsGetResponse";
import { ITeamCommentsPostBody } from "@/@types/team/comments/ITeamCommentsPostBody";
import { ITeamCommentsPostResponse } from "@/@types/team/comments/ITeamCommentsPostResponse";
import { escape } from "@/utils/escape";
import { intersection } from "@/utils/intersection";
import { requests } from "@/utils/requests";
import { subtraction } from "@/utils/subtraction";
import { useMutation, useQuery } from "@tanstack/react-query";

type ITeamCommentWithNext = ITeamCommentsGetResponse["comments"][number];

type ITeamCommentWithoutNext = Omit<ITeamCommentWithNext, "next">;

interface IDataOfUseTeamComments {
  problems: ITeamCommentWithoutNext[];
  goals: ITeamCommentWithoutNext[];
  solutions: ITeamCommentWithoutNext[];
}

type TUseTeamComments = (teamId: string) => {
  data: IDataOfUseTeamComments | undefined;
  isLoading: boolean;
  setData: (data: IDataOfUseTeamComments) => void;
};

const commentsWithoutNextToCommentsWithNext = (
  comments: ITeamCommentWithoutNext[]
): ITeamCommentWithNext[] =>
  comments.reduceRight<ITeamCommentWithNext[]>((list, comment) => {
    if (list.length === 0) list.unshift({ ...comment, next: undefined });
    else list.unshift({ ...comment, next: list[0].id });
    return list;
  }, []);

const commentsToDataOfUseTeamComments = (
  comments: ITeamCommentWithNext[]
): IDataOfUseTeamComments => {
  const dataOfUseTeamCommentsWithoutNext = comments.reduce<{
    problems: ITeamCommentWithoutNext[];
    goals: ITeamCommentWithoutNext[];
    solutions: ITeamCommentWithoutNext[];
  }>(
    (result, current) => {
      result[`${current.type}s`].push(current);
      return result;
    },
    {
      problems: [],
      goals: [],
      solutions: [],
    }
  );
  return {
    problems: commentsWithoutNextToCommentsWithNext(
      dataOfUseTeamCommentsWithoutNext.problems
    ),
    goals: commentsWithoutNextToCommentsWithNext(
      dataOfUseTeamCommentsWithoutNext.goals
    ),
    solutions: commentsWithoutNextToCommentsWithNext(
      dataOfUseTeamCommentsWithoutNext.solutions
    ),
  };
};

export const useTeamComments: TUseTeamComments = (teamId) => {
  const url = `/teams/${escape(teamId)}/comments`;

  const getComments = async () => {
    const comments = await requests<ITeamCommentsGetResponse>(url);
    return commentsToDataOfUseTeamComments(comments.comments);
  };
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

  const compareIdFn = (
    a: ITeamCommentWithoutNext,
    b: ITeamCommentWithoutNext
  ) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    if (a.body < b.body) return -1;
    if (a.body > b.body) return 1;
    return 0;
  };

  const compareWholeFn = (
    a: ITeamCommentWithoutNext,
    b: ITeamCommentWithoutNext
  ) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    if (a.body < b.body) return -1;
    if (a.body > b.body) return 1;
    return 0;
  };

  // query: データ取得のサポート
  const { data, isLoading, refetch } = useQuery<IDataOfUseTeamComments>({
    queryKey: ["teams", teamId, "comments"],
    queryFn: getComments,
  });

  // mutation: データ更新のサポート
  const mutation = useMutation<
    IDataOfUseTeamComments,
    unknown,
    IDataOfUseTeamComments
  >({
    mutationFn: async (newData) => {
      if (data === undefined) {
        return newData;
      }

      const oldComments: ITeamCommentWithNext[] = [
        ...data.problems,
        ...data.goals,
        ...data.solutions,
      ];
      const newComments: ITeamCommentWithNext[] = [
        ...commentsWithoutNextToCommentsWithNext(newData.problems),
        ...commentsWithoutNextToCommentsWithNext(newData.goals),
        ...commentsWithoutNextToCommentsWithNext(newData.solutions),
      ];

      const deletedComments = subtraction(
        oldComments,
        intersection(oldComments, newComments, compareIdFn),
        compareIdFn
      );
      const addedComments = subtraction(
        oldComments,
        intersection(oldComments, newComments, compareIdFn),
        compareIdFn
      );
      const changedComments = subtraction(
        subtraction(newComments, addedComments, compareIdFn),
        oldComments,
        compareWholeFn
      );

      for (const comment of deletedComments) {
        await deleteComment(comment.id);
      }
      for (const comment of addedComments) {
        await postComment({ comment });
      }
      for (const comment of changedComments) {
        await putComment(comment.id, { comment });
      }

      return newData;
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  const setData = (data: IDataOfUseTeamComments) => {
    mutation.mutate(data);
  };

  return { data, isLoading, setData };
};
