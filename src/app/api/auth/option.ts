import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcypt from "bcrypt";
import { connectDB } from "../../../lib/helpling/dbconnection";
import { UserModal } from "../../../../models/user";
import { use } from "react";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
        
                id: "credentials",
                name: "Credentials",
                Credentials:{
                    username: {
                        label: "username",
                        placeholder: "username",
                        type: "text",
                    },
                    password: { 
                        label: "password",
                        placeholder: "password",
                        type: "password",
                    },
                    async authorize(credentials :any):Promise<any> {
                        await connectDB();
                        try {
                          const user  await UseModel.findOne({
                                $or: [
                                    { username: credentials.username },
                                    { email: credentials.username } ]
                            })
                            if(!user) {
                                throw new Error("User not found");
                            }
                            if(!user.verified) {
                                throw new Error("User not verified");
                            }
                            const isPasswordCorrect =await bcypt.compare(credentials.password, user.password)
                            if(isPasswordCorrect) {
                                return user;
                            }
                            else {
                                throw new Error("Invalid password");
                            }
                        }
                        catch (err : any) {
                            console.log("Error connecting to database:", err);
                            return null;
                        }

                }

            )} 
    ]
}