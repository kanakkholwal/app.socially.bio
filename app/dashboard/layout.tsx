import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import { SessionType } from "src/types/session";
import Navbar from "./navbar";
import Sidenav from "./sidenav";

const font = Poppins({
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
    subsets: ["latin-ext", "latin"],
    preload: true,
    adjustFontFallback: true,
});

export const metadata: Metadata = {
    title: "Dashboard | " + process.env.NEXT_PUBLIC_APP_NAME,
    description: "Your dashboard on " + process.env.NEXT_PUBLIC_APP_NAME,
    keywords: "dashboard, account, " + process.env.NEXT_PUBLIC_APP_NAME,

}

export default async function Layout({ children }: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions) as SessionType | null;
    console.log(session)
    if (!session || !session?.user) return redirect("/")


    return (<div className={"w-full min-h-screen h-full relative flex items-stretch bg-white " + font.className}>
        <Sidenav />
        <div className="flex-1 min-h-screen w-full p-0">
            <Navbar user={session.user} />
            <main className="w-full h-full p-4 pt-8">
                {children}
            </main>
        </div>
    </div>)
}