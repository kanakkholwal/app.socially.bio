"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
// import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passHide, setPassHide] = useState(true);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    return (<>
        <div className="grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="email">Enter your Email or username</Label>
            <Input type="email" id="email" placeholder="e.g. johndoe@gmail.com" variant="fluid"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="pr-10" />
        </div>
        <div className="grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="password">Enter your password</Label>
            <div className="relative">
                <Input
                    type={passHide ? "password" : "text"} id="password" variant="fluid"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="*******" className="pr-10" />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={(e) => {
                    e.preventDefault();
                    setPassHide(!passHide)
                }}>
                    {passHide ? <FaRegEyeSlash className="h-5 w-5" /> : <FaRegEye className="h-5 w-5" />}
                </span>
            </div>
        </div>
        <div className="grid w-full max-w-lg items-center gap-1.5">
            <Button className="w-full rounded-full ease-linear hover:bg-black duration-300 text-base"
                disabled={(loading || email.length < 6 || password.length < 6)}
                size="lg">
                Log in to your Account
            </Button>
        </div>
        <div className="pt-lg  max-w-lg text-center">
            <p className="text-center my-4 capitalize text-sm text-concrete font-semibold">
                OR SIGN IN WITH
            </p>
            <div className="w-full max-w-lg flex flex-col gap-3">
                <Button className="rounded-full ease-linear  duration-300 text-base font-medium text-slate-900 bg-white hover:bg-slate-100 border border-solid border-border shadow-lg shadow-slate-200" size="lg">
                    <FcGoogle className="mr-2 h-6 w-6" />
                    Continue with Google
                </Button>
                {/* <Button className="rounded-full ease-linear duration-300 text-base font-medium text-slate-100 bg-slate-700 hover:bg-slate-800 shadow-lg" size="lg">
                <FaApple className="mr-2 h-6 w-6" />
                Continue with Apple
              </Button> */}
            </div>
            <div className="flex justify-center mt-8">
                <p className="text-concrete">
                    Don't have an account?&nbsp;</p>
                <Link className=" text-primary inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 underline"
                    href="/register" data-testid="register_redirect">Register</Link>
            </div>
        </div>

    </>)

}