import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

export const NextAuthProvider: FC<Props> = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      void router.push("/");
    }
  }, [router, session]);

  return <>{children}</>;
};
