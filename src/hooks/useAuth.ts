import { IAuthPostResponse } from "@/@types/auth/IAuthPostResponse";
import { requests } from "@/utils/requests";
import { useEffect, useState } from "react";

type TUseAuth = (token: string) => {
  auth: IAuthPostResponse | undefined;
};

export const useAuth: TUseAuth = (token: string) => {
  const url = "/auth";

  const [auth, setAuth] = useState<IAuthPostResponse>();

  const postAuth = () =>
    requests<IAuthPostResponse>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

  useEffect(() => {
    if (!token) return;
    void (async () => {
      const res = await postAuth();
      setAuth(res);
    })();
  }, [token]);

  return {
    auth,
  };
};
