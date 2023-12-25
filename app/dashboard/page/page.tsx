
import Link from "next/link";
import { BiCategoryAlt } from "react-icons/bi";
import { CgFeed } from "react-icons/cg";

export default function DashboardPage() {
    return (
        <>
            <h4 className="text-4xl font-semibold text-slate-900">
                Quick Access
            </h4>
            <p className="text-md font-regular  mt-5">
                Customise your page and generate feed links.
            </p>
            <div className="grid grid-rows-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 p-4 ">
                <Link href="/dashboard/page/appearance">
                    <div className="p-4 py-8 rounded-xl text-center border border-border bg-slate-100 hover:border-primary">
                        <BiCategoryAlt className="text-4xl text-primary inline-block" />
                        <h4 className="text-xl font-semibold text-slate-900 mt-2">
                            Appearance
                        </h4>
                        <p className="text-sm font-regular text-slate-600">
                            Change the appearance of your page
                        </p>
                    </div>
                </Link>
                <Link href="/dashboard/page/feed">
                    <div className="p-4 py-8 rounded-xl text-center border border-border bg-slate-100 hover:bg-tertiary/10 hover:border-tertiary">
                        <CgFeed className="text-4xl text-primary inline-block" />
                        <h4 className="text-xl font-semibold text-slate-900 mt-2">
                            Feed
                        </h4>
                        <p className="text-sm font-regular text-slate-600">
                            Generate feed links for your page
                        </p>
                    </div>
                </Link>
            </div>
        </>
    )
}