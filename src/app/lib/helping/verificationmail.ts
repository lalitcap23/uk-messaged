import { resend } from "@/app/lib/resend";
import VerificationEmail from "@/app/Emails/verificationEmail";
import { ApiResponse } from "@/app/type/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifycode: string
): Promise<ApiResponse> {
    try {
        await resend.({
            to: email,
            subject: "Verify your email",
            html: `<p>Hi ${username}, your verification code is: <b>${verifycode}</b></p>`,
        });

        return { success: true, message: "Verification email sent successfully" };
    } catch (error) {
        console.error("Error sending verification email:", error);
        return { success: false, message: "Failed to send verification email" };
    }
}
