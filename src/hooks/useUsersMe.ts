import { IUsersMeGetResponse } from "@/@types/user/IUsersMeGetResponse";
import { IUsersMePutBody } from "@/@types/user/IUsersMePutBody";
import { queryClient } from "@/utils/queryClient";
import { requests } from "@/utils/requests";
import { useMutation, useQuery } from "@tanstack/react-query";

type TUseUsersMe = () => {
  data: IUsersMeGetResponse | undefined;
  setData: (data: IUsersMePutBody) => void;
  isLoading: boolean;
};

export const useUsersMe: TUseUsersMe = () => {
  const url = "/users/me";

  const getUsersMe = () => requests<IUsersMeGetResponse>(url);
  const putUsersMe = (data: IUsersMePutBody) =>
    requests<IUsersMeGetResponse>(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });

  const query = useQuery<IUsersMeGetResponse>({
    queryKey: ["users", "me"],
    queryFn: getUsersMe,
  });
  const data = query.data;
  const isLoading = query.isLoading;

  const mutation = useMutation<IUsersMeGetResponse, unknown, IUsersMePutBody>({
    mutationFn: putUsersMe,
    onSuccess: (data) => {
      queryClient.setQueryData(["users", "me"], data);
    },
  });
  const setData = (data: IUsersMePutBody) => {
    mutation.mutate(data);
  };

  return { data, setData, isLoading };
};
