import { IAuthDeleteResponse } from "@/@types/auth/IAuthDeleteResponse";
import { IAuthPostResponse } from "@/@types/auth/IAuthPostResponse";
import { requests } from "@/utils/requests";
import { useMutation } from "@tanstack/react-query";

type TUseAuth = (token: string) => {
  setData: (token: string) => void;
  deleteData: () => void;
  isError: boolean;
  error: unknown;
};

type TBody = {
  token: string;
};

export const useAuth: TUseAuth = (token: string) => {
  const url = "/auth";

  const postAuth = () =>
    requests<IAuthPostResponse>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

  const postMutation = useMutation<IAuthPostResponse, unknown, TBody>({
    mutationFn: postAuth,
  });

  const setData = (token: string) => {
    postMutation.mutate({ token });
  };

  const deleteAuth = () =>
    requests<IAuthDeleteResponse>(url, {
      method: "DELETE",
    });
  const deleteMutation = useMutation<IAuthDeleteResponse>({
    mutationFn: deleteAuth,
  });

  const deleteData = () => {
    deleteMutation.mutate();
  };

  return {
    setData,
    deleteData,
    isError: postMutation.isError,
    error: postMutation.error,
  };
};
