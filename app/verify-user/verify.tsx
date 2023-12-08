"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./animate.css";

export default function VerifyUser({ validateUser, requestNewVerificationToken }: {
    validateUser: (token: string) => Promise<{
        result: "fail" | "success",
        message: string,
        expired?: boolean
    }>,
    requestNewVerificationToken: (email: string) => Promise<{
        result: "fail" | "success",
        message: string
    }>
}) {
    const params = useSearchParams();
    const router = useRouter();
    const [error, setError] = useState<{
        result: "fail" | "success",
        message: string,
        expired?: boolean
    } | null>(null);
    const [isVerifiying, setIsVerifying] = useState<boolean>(true);
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    useEffect(() => {
        if (!params.get("token")) {
            setError({
                result: "fail",
                message: "Invalid verification token",
                expired: false
            })
            router.push("/auth/login")
        }
        setIsVerifying(true)
        setError(null)

        validateUser(params.get("token") as string)
            .then((res) => {
                if (res.result === "success") {
                    setIsVerified(true)
                    setTimeout(() => {
                        router.push("/auth/login")
                    }, 8000)
                } else if (res.result === "fail") {
                    setIsVerified(false)
                    setError(res)
                }
            }).catch((err) => {
                console.log(err)
                setError(err)
            }).finally(() => {
                setIsVerifying(false)
            })

    }, [params])

    return (<>
        <Card className="m-auto max-w-4xl">
            <CardHeader className="text-center flex-row justify-center">
                <Link href="/">
                    <Image src="/socially-bio.svg" alt="Login" width={200} height={200} />
                </Link>
            </CardHeader>
            <CardContent className="text-center flex flex-col justify-center items-center space-y-4">
                <div>
                    <h3 className="text-lg font-bold">
                        Welcome to the {process.env.NEXT_PUBLIC_APP_NAME}
                    </h3>
                </div>

                <div>
                    {isVerifiying && <>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className="w-24 h-24">
                            <path fill="#0A0A30" d="M6.685 13.626a1.626 1.626 0 100-3.252 1.626 1.626 0 000 3.252zm5.315 0a1.626 1.626 0 100-3.252 1.626 1.626 0 000 3.252zm5.316 0a1.626 1.626 0 100-3.252 1.626 1.626 0 000 3.252z"
                                style={{
                                    animation: "loader3 1s cubic-bezier(.63,-.71,.32,1.28) infinite both",
                                    transformOrigin: "center center"
                                }} /></svg>
                    </>}
                    {isVerified && <>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className="w-24 h-24">
                            <circle cx="12" cy="12" r="8" stroke="#0A0A30" strokeWidth="1.5" />
                            <path stroke="#8129d9" strokeLinecap="round" strokeWidth="1.5" d="M9.215 12.052l1.822 1.805 3.748-3.714"
                                style={{
                                    animation: "check 2s forwards cubic-bezier(.99,-.1,.01,1.02)"
                                }} strokeDashoffset="100" strokeDasharray="100" /></svg>
                    </>}
                    {error && (<>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className="w-24 h-24">
                            <path fill="#db1010" fillRule="evenodd" d="M4.75 12a7.25 7.25 0 0111.819-5.63L6.37 16.57A7.22 7.22 0 014.75 12zm2.681 5.63A7.25 7.25 0 0017.63 7.431L7.431 17.63zM12 3.25a8.75 8.75 0 100 17.5 8.75 8.75 0 000-17.5z" clipRule="evenodd"
                                style={{ transformOrigin: "center center", animation: "ban-n 1s cubic-bezier(.25,.46,.45,.94) forwards both" }}
                            /></svg>
                    </>)}
                </div>

                {isVerified && <h1 className="text-2xl font-bold">Email Verified!</h1>}
                {isVerifiying && <h1 className="text-2xl font-bold">Verifying your email...</h1>}
                {error && <h1 className="text-2xl font-bold">Error!</h1>}

                {isVerifiying && <p className="text-md animate-pulse">Please wait while we verify your email...</p>}
                {isVerified && <p className="text-md">Your email has been verified. You can now login.</p>}
                {error && <p className="text-red-500 text-md">{error.message.toString()}</p>}

                {error && <>
                    {error.expired === true && <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full rounded-full ease-linear hover:bg-black duration-300 text-base shadow-lg shadow-violet-200" size="lg">
                                Request new verification token
                            </Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Request new verification token
                                </DialogTitle>
                                <DialogDescription>
                                    <p className="text-sm">Request a new verification token to be sent to your email.</p>
                                </DialogDescription>
                            </DialogHeader>
                            <RequestNewVerificationToken requestNewVerificationToken={requestNewVerificationToken} />
                        </DialogContent>
                    </Dialog>}

                    <Button
                        className="w-full rounded-full ease-linear hover:bg-black duration-300 text-base shadow-lg shadow-violet-200"
                        size="lg" asChild>
                        <Link href="/auth/register">
                            Register a new account
                        </Link>
                    </Button>


                </>}
                {isVerified && <Button
                    className="w-full rounded-full ease-linear hover:bg-black duration-300 text-base shadow-lg shadow-violet-200"
                    size="lg" asChild>
                    <Link href="/auth/login">
                        Login to your account
                    </Link>
                </Button>}
            </CardContent>
        </Card>

    </>)
}

function RequestNewVerificationToken({ requestNewVerificationToken }: {
    requestNewVerificationToken: (email: string) => Promise<{
        result: "fail" | "success",
        message: string
    }>
}) {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{
        result: "fail" | "success",
        message: string
    } | null>(null);
    return (<>
        <div className="grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="email">Enter your Email</Label>
            <Input type="email" id="email" placeholder="e.g. johndoe@gmail.com" variant="fluid"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                value={email} onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="pr-10" />
        </div>
        <div className="grid w-full max-w-lg items-center gap-1.5">
            <Button className="w-full rounded-full ease-linear hover:bg-black duration-300 text-base shadow-lg shadow-violet-200" size="lg"
                disabled={loading || email.length < 6}
                onClick={(e) => {
                    e.preventDefault();
                    setLoading(true)
                    requestNewVerificationToken(email)
                        .then((res) => {
                            if (res.result === "success") {
                                toast.success(res.message)
                            } else if (res.result === "fail") {
                                setError(res)
                            }
                        }).catch((err) => {
                            console.log(err)
                            setError(err)
                        }).finally(() => {
                            setLoading(false)
                        })
                }}>
                Request new verification token
            </Button>
        </div>
    </>)
}