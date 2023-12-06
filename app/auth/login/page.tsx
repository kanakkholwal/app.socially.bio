import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";


import { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
    title: "Login | " + process.env.NEXT_PUBLIC_APP_NAME,
    description: "Login to your account on " + process.env.NEXT_PUBLIC_APP_NAME,
    keywords: "login, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}
export default async function Login() {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (session) return redirect("/")

    return (
        <>

            <header className="mb-2xl text-center mt-16 p-4">
                <h1 className="text-black text-[32px] font-extrabold leading-heading tracking-[-1px] lg:text-4xl lg:tracking-[-2px] mb-md"
                    data-aos="fade-up"
                >
                    Welcome Back
                </h1>
                <p className="text-concrete text-xl" data-aos="fade-up"
                    data-aos-delay="300">
                    Log in to Socially Bio!
                </p>
            </header>
            <main className="flex flex-col items-center justify-center w-full p-4 space-y-4">
                <LoginForm />
            </main>

        </>
    )
}
