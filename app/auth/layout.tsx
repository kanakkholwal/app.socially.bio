import Image from "next/image";
import Link from "next/link";

export default function Layout({children}:{
    children: React.ReactNode
}) {
    return (
        <div className="flex lg:flex-row relative min-h-screen w-full">
            <div className="relative pt-xl flex flex-col w-full md:py-lg md:px-2xl lg:p-2xl lg:pb-sm lg:w-[calc(100vw-52%)] min-h-screen justify-start bg-white">
                {/* Register or Login */}
                <nav className="flex flex-col items-center justify-center w-full p-4 py-6 space-y-4 border-b border-border border-solid">
                    <Link href="/">
                        <Image src="/socially-bio.svg" alt="Login" width={200} height={200} />
                    </Link>
                </nav>

                {children}


            </div>
            <div className="hidden relative -z-10 items-stretch justify-center overflow-hidden lg:!flex lg:w-[calc(100vw-48%)] bg-center bg-no-repeat bg-cover bg-tertiary/5"
            // style={{ backgroundImage: "url(/illustration_1.png)" }}
            >
                <Image src="/illustration_2.svg" alt="Illustration" width={960} height={1024} className="absolute inset-0 min-h-screen h-full" />
            </div>
        </div>
    )
}
