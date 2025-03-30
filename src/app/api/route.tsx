import dbConnect from "../lib/dbconnection";
import UserModal from "../model/user";
 import bcrypt from "bcrypt";
 import { sendVerificationEmail } from "../lib/helping/sendverificationmail";
export async function POST(request: Request) {
    await dbConnect();
    const body = await request.json();
    const { email, username, password } = body;
    console.log("body", body);
    try {
        await dbConnect();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModal({
        email,
        username,
        password: hashedPassword,
        });
        await newUser.save();
    
        const verifycode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("verifycode", verifycode);
    
        const response = await sendVerificationEmail(email, username, verifycode);            
        console.log("response", response);
    
        return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        });
    } catch (error) {
        console.error("Error:", error);
        return new Response(
        JSON.stringify({ success: false, message: "Internal server error" }),
        { status: 500 }
        );
    }

}
