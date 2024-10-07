import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: { maxAge: 60 * 15 },
  pages: {
    signIn: "/auth/login",
  },
});
