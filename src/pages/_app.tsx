import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { NextAuthProvider } from "@/components/common/NextAuthProvider";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session as Session}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <NextAuthProvider>
          <Component {...pageProps} />
        </NextAuthProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
