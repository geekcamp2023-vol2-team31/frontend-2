import { ITeamGetResponse } from "@/@types/team/ITeamGetResponse";
import { ITeamPutBody } from "@/@types/team/ITeamPutBody";
import { queryClient } from "@/utils/queryClient";
import { requests } from "@/utils/requests";
import { useMutation, useQuery } from "@tanstack/react-query";

type TUseTeam = (teamId: string) => {
  data: ITeamGetResponse | undefined;
  setData: (data: ITeamPutBody) => void;
  isLoading: boolean;
};

export const useTeam: TUseTeam = (teamId) => {
  const url = `/teams/${decodeURIComponent(teamId)}`;

  const getTeam = () => requests<ITeamGetResponse>(url);
  const putTeam = (data: ITeamPutBody) =>
    requests<ITeamGetResponse>(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });

  // query: データ取得のサポート
  const { data, isLoading } = useQuery<ITeamGetResponse>({
    queryKey: ["teams", teamId],
    queryFn: getTeam,
  });

  // mutation: データ更新のサポート
  const mutation = useMutation<ITeamGetResponse, unknown, ITeamPutBody>({
    mutationFn: putTeam,
    onSuccess: (data) => {
      queryClient.setQueryData<ITeamGetResponse>(["teams", teamId], data);
    },
  });
  const setData = (data: ITeamPutBody) => {
    mutation.mutate(data);
  };

  // TODO: socket.ioのイベントをリッスンしてqueryClient.setQueryDataする。

  return { data, setData, isLoading };
};
