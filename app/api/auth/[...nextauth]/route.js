import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "../../../models/User"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import { ConnectDB } from "../../../lib/mongoose"

dotenv.config();

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await ConnectDB()
        const user = await User.findOne({
          $or: [
            { email: credentials.email },
            { username: credentials.email }
          ]
        }, 'name email profilePic username password donations');
        if (!user) {
          throw new Error("No user found with this email");
        }
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }
        console.log(user.username + ' Logged in');
        return {
          name: user.name,
          email: user.email,
          image: user.profilePic,
          username: user.username,
          donations: user.donations
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "credentials") {
        return true;
      }
      await ConnectDB()
      const verifiedUser = await User.findOne({ email: user.email });
      user.isNewUser = !verifiedUser;
      return true;
    },

    async jwt({ token, user }) {
      if (user && user.username) {
        token.name = user.name;
        token.username = user.username;
        token.image = user.image;
        token.email = user.email;
        token.donations = user.donations
      }
      if (user?.isNewUser !== undefined) {
        token.isNewUser = user.isNewUser;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      if (token?.name) session.user.name = token.name;
      if (token?.username) session.user.username = token.username;
      if (token?.image) session.user.image = token.image;
      if (token?.email) session.user.email = token.email;
      if (token?.donations) session.user.donations = token.donations
      if (token?.isNewUser !== undefined) {
        session.user.isNewUser = token.isNewUser;
      }
      return session;
    },
  },
})

export { handler as GET, handler as POST }
