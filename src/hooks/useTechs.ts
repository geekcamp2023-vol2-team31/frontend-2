import { ITechPutBody } from "@/@types/tech/ITechPutBody";
import { ITechsGetResponse } from "@/@types/tech/ITechsGetResponse";
import { escape } from "@/utils/escape";
import { queryClient } from "@/utils/queryClient";
import { requests } from "@/utils/requests";
import { useMutation, useQuery } from "@tanstack/react-query";

type TUseTechs = () => {
  data: ITechsGetResponse | undefined;
  setData: (data: ITechsGetResponse) => void;
  isLoading: boolean;
};

export const useTechs: TUseTechs = () => {
  const url = "/techs";

  const getTechs = () => requests<ITechsGetResponse>(url);
  const putTech = (techName: string, data: ITechPutBody) =>
    requests<ITechPutBody>(`${url}/${escape(techName)}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

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

      const oldNames = data.techs.map((tech) => tech.name);
      const oldNamesSet = new Set(oldNames);

      for (const tech of newData.techs) {
        // 古いリストにない項目は追加する。
        if (oldNamesSet.has(tech.name) === false) {
          await putTech(tech.name, { tech });
          continue;
        }

        // 変更のない項目はそのままにする。
        const oldTech = data.techs.find(
          (oldTech) => tech.name === oldTech.name
        );
        if (
          oldTech === undefined ||
          (oldTech.color === tech.color && oldTech.icon === tech.icon)
        ) {
          continue;
        }

        // 変更のある項目は変更する。
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
