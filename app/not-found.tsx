import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default function ErrorPage() {
    return <div className="min-h-screen w-full p-5 flex justify-between items-stretch bg-white ">
        <div className="flex flex-col justify-center items-center p-4 w-full h-screen">
            <Image src="/404.svg" width={500} height={500} alt="Not found | Socially Bio"
                className="object-contain w-full h-auto max-w-6xl mix-blend-multiply"
            />

            <h4 className="text-4xl font-semibold text-slate-900">
                Page not found

            </h4>
            <p className="text-md font-regular  mt-5">
                The page you are looking for doesn't exist or has been moved.

            </p>
            <div className="mt-5 flex justify-center items-center gap-3">
                <Button className="bg-slate-900 text-white" asChild>
                    <Link href="/">Go to Home</Link>
                </Button>
                </div>
        </div>

    </div>
}