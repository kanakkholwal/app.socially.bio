import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import dbConnect from "src/lib/dbConnect";
import User from "src/models/user";

const GOOGLE_ID = process.env.GOOGLE_ID || "";
const GOOGLE_SECRET = process.env.GOOGLE_SECRET || "";
const NEXT_AUTH_SECRET = process.env.NEXT_AUTH_SECRET ;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "";
const INSTAGRAM_CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID || "";
const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET || "";

if (!GOOGLE_ID) {
    throw new Error("GOOGLE_ID is not defined");
}
if (!GOOGLE_SECRET) {
    throw new Error("GOOGLE_SECRET is not defined");
}
if (!NEXT_AUTH_SECRET) {
    throw new Error("NEXT_AUTH_SECRET is not defined");
}
if (!NEXTAUTH_URL) {
    throw new Error("NEXTAUTH_URL is not defined");
}
if (!INSTAGRAM_CLIENT_ID) {
    throw new Error("INSTAGRAM_CLIENT_ID is not defined");
}
if (!INSTAGRAM_CLIENT_SECRET) {
    throw new Error("INSTAGRAM_CLIENT_SECRET is not defined");
}

export const authOptions :NextAuthOptions = {
    // Enable JSON Web Tokens since we will not store sessions in our DB
    session: {
        strategy: "jwt",
    },
    secret: NEXT_AUTH_SECRET,

    // Here we add our login providers - this is where you could add Google or Github SSO as well
    providers: [
        CredentialsProvider({
            name: "credentials",
            // The credentials object is what's used to generate Next Auth default login page - We will not use it however.
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            // Authorize callback is ran upon calling the sign-in function
            authorize: async (credentials: Record<"email" | "password", string> | undefined) => {


                // return Promise.resolve(user)
                return new Promise(async (resolve, reject) => {
                    if (!credentials || !credentials.email || !credentials.password) {
                        return reject({
                            status: 401,
                            message: "Credentials not provided",
                            success: false
                        })
                    }

                    try {

                        await dbConnect();

                        // Try to find the user and also return the password field
                        const user = await User.findOne({ email: credentials.email }).select('+password')

                        if (!user) {
                            return reject({
                                status: 401,
                                message: "User not found",
                                success: false
                            })
                        }

                        // Use the comparePassword method we defined in our user.js Model file to authenticate
                        const pwValid = await user.comparePassword(credentials.password)


                        if (!pwValid) {


                            reject({
                                status: 401,
                                message: "Wrong Password",
                                success: false
                            })

                        }



                        // console.log(user)
                        resolve(user)

                    }
                    catch (err) {

                        console.log(err)
                        reject(err)
                    }
                })

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
            async profile(profile: GoogleProfile) {
                try {
                    console.log(profile);
                    await dbConnect();
                    const userInDb = await User.findOne({ email: profile.email })
                    if (!userInDb) {

                        const user = new User({
                            name: profile.name,
                            email: profile.email,
                            profileURL: profile.picture,
                            password: "google" + profile.sub,
                            role: "user",
                            account_type: "free",
                            verificationToken: null,
                            verified: true,
                        });
                        await user.save();

                        return Promise.resolve(user);
                    }


                    return Promise.resolve(userInDb)
                }
                catch (err) {
                    console.log(err);
                    return Promise.reject("/login?error=google_error")
                }


            },
        }),
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID || "",
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || "",
            profile(profile: Record<string, any>) {
                console.log(profile);
                return {
                    id: profile.id,
                    name: profile.username,
                    email: profile.username + "@instagram.com",
                    image: profile.profile_picture
                }
            }
        })

    ],
    // All of this is just to add user information to be accessible for our app in the token/session
    callbacks: {
        // We can pass in additional information from the user document MongoDB returns
        // This could be avatars, role, display name, etc...
        // async jwt({ token, user }) {
        //     if (user) {
        //         token.user  = {
        //             id: user._id,
        //             name: user.name,
        //             email: user.email,
        //             username: user.username,
        //             account_type: user.account_type || "free",
        //             profilePicture: user.profilePicture,
        //             role: user.role || "user",
        //             verified: user.verified || false,
        //         }
        //     }
        //     return token
        // },
        // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
        // session: async ({ session, token }) => {
        //     if (token) {
        //         session.user = token.user
        //     }
        //     return session
        // }
    },

    pages: {
        // Here you can define your own custom pages for login, recover password, etc.
        signIn: '/login', // Displays sign in buttons
        // signOut: '/auth/sign out',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
        newUser: '/signup'
    },
}



