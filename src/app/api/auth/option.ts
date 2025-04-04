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
          label: "username",
          placeholder: "username",
          type: "text",
        },
        password: {
          label: "password",
          placeholder: "password",
          type: "password",
        }
      },
      async authorize(credentials: any): Promise<any> {
        await connectDB();
        try {
          const user = await UserModal.findOne({ 
            $or: [
              { username: credentials.username },
              { email: credentials.username }
            ]
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
          console.log("Error connecting to database:", err);
          return null;
        }
      }
    })
  ]
};