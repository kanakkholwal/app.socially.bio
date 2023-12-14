import { Button } from "@/components/ui/button";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Link from 'next/link';
import dbConnect from "src/lib/dbConnect";
import TempLink from "src/models/tempLink";
import { SessionType } from "src/types/session";
import { TempLinkType } from "src/types/tempLink";
import Item from './link';

export const revalidate = 1;

export const metadata = {
    title: "All Links | " + process.env.NEXT_PUBLIC_APP_NAME,
    description: "Checkout all your links here!"
}
export default async function DashboardPage() {
    await dbConnect();
    const session = await getServerSession(authOptions) as SessionType
    const links = await TempLink.find({
        creator: session?.user?._id
    }).sort({ createdAt: 'desc' }).lean();
    const jsonLinks = JSON.parse(JSON.stringify(links));

    return (
        <>
            <h4 className="text-4xl font-semibold text-slate-900">
                All Links
            </h4>
            <p className="text-md font-regular  mt-5">
                Checkout all your links here!
            </p>
            <div className="mt-5 pt-5 border-t border-border">
                {jsonLinks.length > 0 ? jsonLinks.map((link:TempLinkType) => {
                    return (<Item key={link._id} link={link} />)
                }) : (<div className="bg-slate-100 px-5 py-10 lg:py-20 text-center rounded-lg">
                    <h5 className="text-2xl font-semibold text-slate-900">
                        No links found!
                    </h5>
                    <p className="text-md font-regular mt-3">
                        Create your first link now!
                    </p>
                    <Link href="/dashboard/links/create">
                        <Button className="text-sm px-5 py-2 rounded-full tracking-wide bg-primary  text-white hover:bg-primary/90 mt-5">
                            Create new Link 
                        </Button>
                    </Link>
                    
                </div>)}
            </div>

        </>
    )
}