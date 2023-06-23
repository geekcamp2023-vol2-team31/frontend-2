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
    jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account?.access_token,
        };
      }
      return token;
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
};
export default NextAuth(authOptions);
