import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { selectUserByEmail } from "@/dbQuery/users";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOGGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider === "google") {
        const existingUser = await selectUserByEmail(user.email!);
        console.log(existingUser);
        if (existingUser) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log(url);
      console.log(baseUrl);
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
