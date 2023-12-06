import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Dashboard | " + process.env.NEXT_PUBLIC_APP_NAME,
    description: "Dashboard for " + process.env.NEXT_PUBLIC_APP_NAME,
    keywords: "dashboard, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}
export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session) return redirect("/auth/login")

  return (
    <>
    Dashboard
    </>
  )
}
