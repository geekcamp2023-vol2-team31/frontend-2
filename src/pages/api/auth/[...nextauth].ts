import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, account }) {
      token.accessToken = account?.access_token;
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
      };
    },
  },
};
export default NextAuth(authOptions);
