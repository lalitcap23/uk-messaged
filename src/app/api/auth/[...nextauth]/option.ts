import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "../../../lib/helpling/dbconnection";
import { UserModal } from "../../../../models/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          placeholder: "Enter your username",
          type: "text",
        },
        password: {
          label: "Password",
          placeholder: "Enter your password",
          type: "password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDB();
        try {
          const user = await UserModal.findOne({
            $or: [
              { username: credentials.username },
              { email: credentials.username },
            ],
          });

          if (!user) {
            throw new Error("User not found");
          }

          if (!user.verified) {
            throw new Error("User not verified");
          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Invalid password");
          }
        } catch (err: any) {
          console.error("Error during authentication:", err.message);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/Sign-in',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session}) {
      
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
