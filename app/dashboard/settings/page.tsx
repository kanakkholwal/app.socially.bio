import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { SessionType } from "src/types/session";
import Settings from "./setting";

export const metadata = {
    title: "Settings | " + process.env.NEXT_PUBLIC_APP_NAME,
    description: "Manage your account settings and set e-mail preferences.",
    keywords: "settings, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}
export default async function SettingsPage() {
    const session = await getServerSession(authOptions) as SessionType;
    return <Settings user={session.user}/>  
}