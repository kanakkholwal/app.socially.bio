"use client";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import { GrTransaction } from "react-icons/gr";
import { LuLayoutTemplate } from "react-icons/lu";
import { RiLinksFill } from "react-icons/ri";
import { TbBrandGoogleAnalytics } from "react-icons/tb";

const quickAccess = [
    {
        title: "Create Links",
        description: "Create links for your page",
        link: "/dashboard/links",
        status: "available",
        icon: RiLinksFill
    },
    {
        title: "Page Appearance",
        description: "Change the appearance of your page",
        link: "/dashboard/appearance",
        status: "available",
        icon: LuLayoutTemplate
    },
    {
        title: "Analytics",
        description: "View analytics for your page",
        link: "/dashboard/analytics",
        status: "comming-soon",
        icon: TbBrandGoogleAnalytics
    },
    {
        title: "Create Actions",
        description: "Create actions for your page",
        link: "/dashboard/actions",
        status: "comming-soon",
        icon: GrTransaction
    },
] as {
    title: string,
    description: string,
    link: string,
    status: "available" | "comming-soon",
    icon: React.ElementType
}[]

export default function DashboardPage() {
    return (
        <>
            <h4 className="text-4xl font-semibold text-slate-900">
                Quick Access
            </h4>
            <p className="text-md font-regular  mt-5">
                Welcome to your dashboard!
            </p>
            <div className="grid grid-rows-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 p-4 ">

                {quickAccess.map((item, index) => {
                    return (<Link href={item.link} key={index} className={(item.status !== "available" ? "cursor-not-allowed pointer-events-none" : "")} >
                        <Card
                        className={"shadow-[0px_9px_20px] rouned-xl group  shadow-slate-200 hover:border-primary hover:shadow-primary/20" + (item.status !== "available" ? "cursor-not-allowed pointer-events-none" : "")}
                        >
                            <CardHeader className="flex gap-3 flex-row items-stretch">
                                <div className="bg-tertiary/20 rounded-full p-3 h-16 w-16 flex items-center justify-center group-hover:bg-primary/20">
                                    <item.icon className="w-6 h-6" />

                                </div>
                                <div>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>{item.description}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>)
                })}


            </div>


        </>
    )
}