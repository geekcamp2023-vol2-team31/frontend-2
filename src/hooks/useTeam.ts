import { useQuery } from "@tanstack/react-query";
import { requests } from "@/utils/requests";
import { ITeamGetResponse } from "@/@types/team/ITeamGetResponse";

export const useTeam = (teamId: string) => {
  const getTeam = () => requests<ITeamGetResponse>(`/teams/${teamId}`);
  const { isLoading, data } = useQuery({
    queryKey: ["teams", teamId],
    queryFn: getTeam,
  });

  return { isLoading, data };
};
