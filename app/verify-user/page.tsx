import { Metadata } from "next";
import dbConnect from "src/lib/dbConnect";
import { verifyVerificationToken } from "src/lib/user";
import User from "src/models/user";
import VerifyUser from "./verify";

export const metadata: Metadata = {
    title: "Verify User",
    description: "Verify User",
    keywords: "Verify User"

}

export default async function VerificationPage() {

    await dbConnect();

    const verifyUser = async (token: string): Promise<{
        result: "fail" | "success",
        message: string,
        expired?: boolean
    }> => {
        "use server"

        return new Promise(async (resolve, reject) => {

            const decodedData = verifyVerificationToken(token);
            console.log(decodedData);
            if (decodedData) {
                console.log('Token is valid. User data:', decodedData);
                const { email, username } = decodedData as Record<string, any>;

                const user = await User.findOne({ email, username })
                if (!user) {
                    return reject({
                        result: "fail",
                        message: 'User not found'
                    })
                }
                if (user.verificationToken !== token) {
                    return reject({
                        result: "fail",
                        message: 'Invalid verification token'
                    })
                }
                if (user.verified) {
                    return reject({
                        result: "fail",
                        message: 'User already verified'
                    })
                }
                user.verified = true;
                user.verificationToken = null;
                await user.save();
                console.log("User verified successfully");
                return resolve({
                    result: "success",
                    message: 'User verified successfully'

                })

            } else {
                console.log('Token is invalid or has expired.');
                return reject({
                    result: "fail",
                    message: 'Token is invalid or has expired.',expired: true
                })
            }
        })

    }
    const requestNewVerificationToken = async (email: string): Promise<{
        result: "fail" | "success",
        message: string
    }> => {
        "use server"

        return new Promise(async (resolve, reject) => {

            const user = await User.findOne({ email })
            if (!user) {
                return reject({
                    result: "fail",
                    message: 'User not found'
                })
            }
            if (user.verified) {
                return reject({
                    result: "fail",
                    message: 'User already verified'
                })
            }
            if (user.verificationToken) {
                return reject({
                    result: "fail",
                    message: 'User already has a verification token'
                })
            }
            user.verificationToken = user.generateVerificationToken();
            await user.save();
            console.log("User verification token generated successfully");
            return resolve({
                result: "success",
                message: 'User verification token generated successfully'

            })
        })

    }


    return (<div className="relative flex items-center justify-center  bg-center bg-no-repeat bg-cover bg-tertiary/5 min-h-screen h-full w-full">
        <VerifyUser validateUser={verifyUser} requestNewVerificationToken={requestNewVerificationToken} />

    </div>)

}