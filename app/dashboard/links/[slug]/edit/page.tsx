import { Button } from "@/components/ui/button";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LuPlusCircle } from "react-icons/lu";
import { RiLinksFill } from "react-icons/ri";
import dbConnect from "src/lib/dbConnect";
import TempLink from "src/models/tempLink";
import { SessionType } from "src/types/session";
import { TempLinkType } from "src/types/tempLink";
import { EditLinkForm } from "../../create/create-form";

export const revalidate = 10;

export const metadata: Metadata = {
    title: "All Links | " + process.env.NEXT_PUBLIC_APP_NAME,
    description: "Checkout all your links here!"
}
export default async function EditPage({ params }: { params: { slug: string } }) {
    await dbConnect();
    const session = await getServerSession(authOptions) as SessionType
    const link = await TempLink.findOne({
        slug: params.slug,
        creator: session?.user?._id
    }).lean();
    if (!link) {
        notFound()
    }
    const tempLink = JSON.parse(JSON.stringify(link)) as TempLinkType;


    return (
        <>
            <div className="flex items-center justify-between flex-wrap gap-5">
                <div>

                    <h4 className="text-4xl font-semibold text-slate-900">
                        <RiLinksFill className="w-6 h-6 mr-2 inline-block" />
                        Edit Link
                    </h4>
                    <p className="text-md font-regular  mt-3">
                        Edit your link here! Change the URL, password, expiry date and more!
                    </p>
                </div>
                <div>
                    <Link href="/dashboard/links/create">
                        <Button variant="tertiary" border="xl">
                            <LuPlusCircle className="w-4 h-4 mr-2" />
                            Create new Link
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="mt-5 pt-5 border-t border-border">
                <EditLinkForm tempLink={tempLink} />
            </div>

        </>
    )
}