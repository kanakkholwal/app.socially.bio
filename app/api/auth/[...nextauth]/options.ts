import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import dbConnect from "src/lib/dbConnect";
import UserModel from "src/models/user";
// Define types for environment variables
interface AuthEnv {
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    NEXT_AUTH_SECRET: string;
    NEXTAUTH_URL: string;
    INSTAGRAM_CLIENT_ID: string;
    INSTAGRAM_CLIENT_SECRET: string;
}

// Define types for user object
interface User {
    _id: string;
    name: string;
    email: string;
    username: string;
    account_type?: string;
    profilePicture: string;
    role?: string;
    verified?: boolean;
}
// Read environment variables
const env: AuthEnv = {
    GOOGLE_ID: process.env.GOOGLE_ID || "",
    GOOGLE_SECRET: process.env.GOOGLE_SECRET || "",
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET || "",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "",
    INSTAGRAM_CLIENT_ID: process.env.INSTAGRAM_CLIENT_ID || "",
    INSTAGRAM_CLIENT_SECRET: process.env.INSTAGRAM_CLIENT_SECRET || "",
};

// Check if all required environment variables are defined
Object.values(env).forEach((value) => {
    if (!value) {
        throw new Error(`Environment variable ${value} is not defined`);
    }
});

export const authOptions :NextAuthOptions  = {
    // Enable JSON Web Tokens since we will not store sessions in our DB
    session: {
        strategy: "jwt",
    },
    secret: env.NEXT_AUTH_SECRET,

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
            authorize: async (credentials) => {


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
                        const user = await UserModel.findOne({ email: credentials.email }).select('+password')

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
            clientId: env.GOOGLE_ID || "",
            clientSecret: env.GOOGLE_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
            async profile(profile) {
                try {
                    console.log(profile);
                    await dbConnect();
                    const userInDb = await UserModel.findOne({ email: profile.email })
                    if (!userInDb) {

                        const user = new UserModel({
                            name: profile.name,
                            email: profile.email,
                            username: profile.email.split("@")[0],
                            profilePicture: profile.picture,
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
            clientId: env.INSTAGRAM_CLIENT_ID || "",
            clientSecret: env.INSTAGRAM_CLIENT_SECRET || "",
            profile(profile: any) {
                console.log(profile);
                return {
                    id: profile.id,
                    name: profile.username,
                    // email: profile.username + "@instagram.com",
                    profilePicture: profile.profile_picture
                }
            }
        })

    ],
    // All of this is just to add user information to be accessible for our app in the token/session
    callbacks: {
        // We can pass in additional information from the user document MongoDB returns
        // This could be avatars, role, display name, etc...
        async jwt({ token, user }:{
            token: any,
            user: any
        }): Promise<any> {
            if (user) {
                token.user = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    account_type: user.account_type || "free",
                    profilePicture: user.profilePicture,
                    role: user.role || "user",
                    verified: user.verified || false,
                }
            }
            return token
        },
        // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
        session: async ({ session, token }:{
            session: any,
            token: any
        }) => {
            if (token) {
                session.user = token.user
            }
            return session
        }
    },

    pages: {
        // Here you can define your own custom pages for login, recover password, etc.
        signIn: '/', // Displays sign in buttons
        // signOut: '/auth/sign out',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
        newUser: '/register'
    },
}



