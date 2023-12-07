import { NextResponse } from "next/server";
import dbConnect from "src/lib/dbConnect";
import { transporter } from "src/lib/mail";
import { generateVerificationToken } from "src/lib/user";
import User from "src/models/user";



const INVALID_CHARACTERS = [" ", "-", "@", "#", "%", "^", "!", "~", "*", "(", ")", "=", "+", ".", ">", ",", "<", "?", `"`, `'`, "{", "}", "[", "]", "|", "$", ":", ";", "&"]

export async function POST(request: Request) {
    try {
        await dbConnect();
        const res = await request.json();
        console.log(res)
        const { email, username, password } = res;

        if (!username || !email || !password) {
            return NextResponse.json({
                result: "fail",
                message: "Please enter all fields"
            }, { status: 400 });
        }
        const isEmail = (email: string) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if (!isEmail(email)) {
            return NextResponse.json({
                result: "fail",
                message: "Please enter a valid email"
            }, { status: 400 });
        }
        if (!username.split('').every((char: string) => !INVALID_CHARACTERS.includes(char))) {

            return NextResponse.json({
                result: "fail",
                message: "Please enter a valid username"
            }, { status: 400 });
        }
        const santisedUsername = username.split('')
            .filter((char: string) => !INVALID_CHARACTERS.includes(char))
            .join('').trim().toLowerCase();
        if (santisedUsername.length < 3) {
            return NextResponse.json({
                result: "fail",
                message: "Username must be at least 3 characters long"
            }, { status: 400 });
        }
        if (password.length < 6) {
            return NextResponse.json({
                result: "fail",
                message: "Password must be at least 6 characters long"
            }, { status: 400 });
        }
        const existingUser = await User.findOne({ email, username });
        if (existingUser) {
            return NextResponse.json({
                result: "fail",
                message: "user is already registered"
            }, { status: 200 });
        }
        const verificationToken = await generateVerificationToken({ email, username });


        const newUser = new User({
            email, username, password,
            name: email.split('@')[0],
            role: "user",
            account_type: "free",
            verificationToken: verificationToken,
        });
        await transporter.sendMail({
            from: `mailer@${process.env.NEXT_WEBSITE_DOMAIN}`,
            to: newUser.email,
            subject: `🌟 Welcome to ${process.env.NEXT_WEBSITE_NAME} - Verify Your Account! 🌟 `,
            html: `
            <h1>Welcome to ${process.env.NEXT_WEBSITE_NAME}</h1>
            <p>Dear ${newUser.name},</p>
            <p>Thank you for signing up with ${process.env.NEXT_WEBSITE_NAME}! We're thrilled to have you on board.</p>
            <p>To complete the registration process and unlock the door to a world of possibilities, please click on the button below to verify your account:</p>
    
              <a href="${process.env.NEXTAUTH_URL}/verify-user?token=${verificationToken}" style=' display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              background-color: rgb(11 165 236);
              color: #ffffff;
              text-decoration: none;
              border-radius: 3px;margin-inline:auto;'>
                Verify Account
              </a>
              <p><small style="color:red">Token will be expired in ${"30"} minutes</small></p>
              <p>If you didn't initiate this sign-up process or have any questions, please disregard this email.</p>
              <p>For any assistance or inquiries, feel free to reach out to our dedicated support team at <a href="mailto:support@email.com">support@${process.env.NEXT_WEBSITE_DOMAIN}</a>. We're here to help!</p>
              <p>Best regards,</p>
              <p>${process.env.NEXT_WEBSITE_NAME} Team</p>

            `,
        });
        await newUser.save();
        return NextResponse.json({
            result: "success",
            message: "User is registered successfully, please check your email to verify your account"
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            result: "fail",
            message: error?.message || 'Something went wrong'
        }, { status: 500 });
    }
}
