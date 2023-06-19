import { useMutation, useQuery } from "@tanstack/react-query";
import { IPutUsersMeBody } from "@/@types/user/IPutUsersMeBody";
import { requests } from "@/utils/requests";
import { IGetUsersMeResponse } from "@/@types/user/IGetUsersMeResponse";

export const useUsersMe = () => {
  const getUsersMe = () => requests<IGetUsersMeResponse>("/users/me");
  const { isLoading, data } = useQuery({
    queryKey: ["users", "me"],
    queryFn: getUsersMe,
  });

  const putUsersMe = (body: IPutUsersMeBody) => {
    return requests<IPutUsersMeBody>("/users/me", {
      method: "PUT",
      body: JSON.stringify(body),
    });
  };
  const mutation = useMutation(putUsersMe);
  const setData = (data: IGetUsersMeResponse) => {
    mutation.mutate({
      user: {
        icon: data.user.icon,
        name: data.user.name,
        bio: data.user.bio,
        techs: [], // FIXME: techsを指定する必要がある
      },
    });
  };

  return { isLoading, data, setData };
};
