import { IUsersMeGetResponse } from "@/@types/user/IUsersMeGetResponse";
import { IUsersMePutBody } from "@/@types/user/IUsersMePutBody";
import { IUsersMeTechPostBody } from "@/@types/user/techs/IUsersMeTechPostBody";
import { IUsersMeTechPutBody } from "@/@types/user/techs/IUsersMeTechPutBody";
import { intersection } from "@/utils/intersection";
import { requests } from "@/utils/requests";
import { subtraction } from "@/utils/subtraction";
import { useMutation, useQuery } from "@tanstack/react-query";
import { escape } from "querystring";

type TUseUsersMe = () => {
  data: IUsersMeGetResponse | undefined;
  setData: (data: IUsersMeGetResponse) => void;
  isLoading: boolean;
};

export const useUsersMe: TUseUsersMe = () => {
  type IUTT = IUsersMeGetResponse["user"]["userToTechs"][number];
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

  const compareWholeFn = (a: IUTT, b: IUTT) => {
    if (a.tech.name < b.tech.name) return -1;
    if (a.tech.name > b.tech.name) return 1;
    if (a.level < b.level) return -1;
    if (a.level > b.level) return 1;
    if (a.level < b.level) return -1;
    return 0;
  };

  const compareIdFn = (a: IUTT, b: IUTT) => {
    if (a.tech.name < b.tech.name) return -1;
    if (a.tech.name > b.tech.name) return 1;
    return 0;
  };

  const { data, isLoading, refetch } = useQuery<IUsersMeGetResponse>({
    queryKey: ["users", "me"],
    queryFn: getUsersMe,
  });

  const mutation = useMutation({
    mutationFn: async (newData: IUsersMeGetResponse) => {
      const oldTechs = data?.user.userToTechs;
      const newTechs = newData.user.userToTechs;

      if (!oldTechs) return newTechs;

      const addedTechs = subtraction(
        newTechs,
        intersection(oldTechs, newTechs, compareIdFn),
        compareIdFn
      );
      const deletedTechs = subtraction(
        oldTechs,
        intersection(oldTechs, newTechs, compareIdFn),
        compareIdFn
      );
      const changedTechs = subtraction(
        subtraction(newTechs, addedTechs, compareIdFn),
        oldTechs,
        compareWholeFn
      );

      for (const utt of deletedTechs) {
        await deleteUsersMeTech(utt.tech.name);
      }
      for (const utt of addedTechs) {
        await postUsersMeTech({ name: utt.tech.name, level: utt.level });
      }
      for (const utt of changedTechs) {
        await putUsersMeTech(utt.tech.name, { level: utt.level });
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
