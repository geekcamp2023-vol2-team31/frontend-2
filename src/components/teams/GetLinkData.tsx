import { ILink } from "./IdeaPage";

const GetLinks = async (teamId: string): Promise<ILink[]> => {
  const response = await fetch(`http://localhost:4000/teams/${teamId}/links`, {
    method: "GET",
  });
  const data = (await response.json()) as unknown as { links: ILink[] };
  return  await data.links;
};

export default GetLinks;
