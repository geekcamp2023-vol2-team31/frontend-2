import { IComment } from "./IdeaPage";

const GetComments = async (teamId: string): Promise<IComment[]> => {
  const response = await fetch(
    `http://localhost:4000/teams/${teamId}/comments`,
    {
      method: "GET",
    }
  );
  const data = (await response.json()) as unknown as { comments: IComment[] };
  return data.comments;
};

export default GetComments;
