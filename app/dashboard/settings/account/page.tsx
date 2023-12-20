import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { SessionType } from "src/types/session";
import Account from "./account";

export const metadata = {
    title: "Profile | " + process.env.NEXT_PUBLIC_APP_NAME,
    description: "Manage your Profile settings ",
    keywords: "profile,settings, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}
export default async function SettingsPage() {
    const session = await getServerSession(authOptions) as SessionType;
    return <Account user={session.user}/>  
}