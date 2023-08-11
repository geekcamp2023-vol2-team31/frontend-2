import { ITechPutBody } from "@/@types/tech/ITechPutBody";
import { ITechsGetResponse } from "@/@types/tech/ITechsGetResponse";
import { escape } from "@/utils/escape";
import { intersection } from "@/utils/intersection";
import { queryClient } from "@/utils/queryClient";
import { requests } from "@/utils/requests";
import { subtraction } from "@/utils/subtraction";
import { useMutation, useQuery } from "@tanstack/react-query";

type TUseTechs = () => {
  data: ITechsGetResponse | undefined;
  setData: (data: ITechsGetResponse) => void;
  isLoading: boolean;
};

export const useTechs: TUseTechs = () => {
  type ITech = ITechsGetResponse["techs"][number];
  const url = "/techs";

  const getTechs = () => requests<ITechsGetResponse>(url);
  const putTech = (techName: string, data: ITechPutBody) =>
    requests<ITechPutBody>(`${url}/${escape(techName)}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  const compareWholeFn = (a: ITech, b: ITech) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    if ((a.color ?? "") < (b.color ?? "")) return -1;
    if ((a.color ?? "") > (b.color ?? "")) return 1;
    if ((a.icon ?? "") < (b.icon ?? "")) return -1;
    if ((a.icon ?? "") > (b.icon ?? "")) return 1;
    return 0;
  };
  const compareIdFn = (a: ITech, b: ITech) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  };

  const { data, isLoading } = useQuery<ITechsGetResponse>({
    queryKey: ["techs"],
    queryFn: getTechs,
  });

  const mutation = useMutation({
    mutationKey: ["techs"],
    mutationFn: async (newData: ITechsGetResponse) => {
      if (data === undefined) {
        return newData;
      }

      const oldTechs = data.techs;
      const newTechs = newData.techs;

      const addedTechs = subtraction(
        newTechs,
        intersection(oldTechs, newTechs, compareIdFn),
        compareIdFn
      );
      const changedTechs = subtraction(
        subtraction(newTechs, addedTechs, compareIdFn),
        oldTechs,
        compareWholeFn
      );

      for (const tech of addedTechs) {
        await putTech(tech.name, { tech });
      }
      for (const tech of changedTechs) {
        await putTech(tech.name, { tech });
      }

      return newData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["techs"], data);
    },
  });

  const setData = (data: ITechsGetResponse) => {
    mutation.mutate(data);
  };

  return { data, isLoading, setData };
};
