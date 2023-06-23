import { IUsersMeGetResponse } from "@/@types/user/IUsersMeGetResponse";
import { IUsersMePutBody } from "@/@types/user/IUsersMePutBody";
import { IUsersMeTechPostBody } from "@/@types/user/techs/IUsersMeTechPostBody";
import { IUsersMeTechPutBody } from "@/@types/user/techs/IUsersMeTechPutBody";
import { requests } from "@/utils/requests";
import { useMutation, useQuery } from "@tanstack/react-query";
import { escape } from "querystring";

type TUseUsersMe = () => {
  data: IUsersMeGetResponse | undefined;
  setData: (data: IUsersMeGetResponse) => void;
  isLoading: boolean;
};

export const useUsersMe: TUseUsersMe = () => {
  const url = "/users/me";

  const getUsersMe = () => requests<IUsersMeGetResponse>(url);
  const putUsersMe = (data: IUsersMePutBody) =>
    requests<IUsersMeGetResponse>(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  const postUsersMeTech = (data: IUsersMeTechPostBody) =>
    requests<unknown>(`${url}/techs`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  const putUsersMeTech = (name: string, data: IUsersMeTechPutBody) =>
    requests<unknown>(`${url}/techs/${escape(name)}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  const deleteUsersMeTech = (name: string) =>
    requests<unknown>(`${url}/techs/${escape(name)}`, {
      method: "DELETE",
    });

  const { data, isLoading, refetch } = useQuery<IUsersMeGetResponse>({
    queryKey: ["users", "me"],
    queryFn: getUsersMe,
  });

  const mutation = useMutation({
    mutationFn: async (newData: IUsersMeGetResponse) => {
      const oldTechs = data?.user.userToTechs;
      const newTechs = newData.user.userToTechs;
      if (oldTechs === undefined) {
        return newTechs;
      }
      const oldTechsMap = new Map(oldTechs.map((utt) => [utt.tech.name, utt]));
      const newTechsMap = new Map(newTechs.map((utt) => [utt.tech.name, utt]));

      for (const oldTech of oldTechs) {
        if (newTechsMap.has(oldTech.tech.name) === false) {
          await deleteUsersMeTech(oldTech.tech.name);
        }
      }

      for (const newTech of newTechs) {
        const oldTech = oldTechsMap.get(newTech.tech.name);

        if (oldTech === undefined) {
          await postUsersMeTech({
            name: newTech.tech.name,
            level: newTech.level,
          });
          continue;
        }

        if (oldTech.level === newTech.level) {
          continue;
        }

        await putUsersMeTech(newTech.tech.name, { level: newTech.level });
      }

      await putUsersMe(newData);
      return newData;
    },
    onSuccess: async () => {
      await refetch();
    },
  });
  const setData = (data: IUsersMeGetResponse) => {
    mutation.mutate(data);
  };

  return { data, setData, isLoading };
};
