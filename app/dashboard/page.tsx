"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
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
        title: "Create Links",
        description: "Create links for your page",
        link: "/dashboard/links",
        status: "available",
        icon: RiLinksFill
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 p-4">

                {quickAccess.map((item, index) => {
                    return (
                        <Card key={index} className={"hover:shadow-xl hover:shadow-slate-200 " + (item.status !== "available" ? "cursor-not-allowed":"")}>
                            <CardHeader className="flex gap-3 flex-row items-stretch">
                                <div className="bg-tertiary/20 rounded-full p-3 h-16 w-16 flex items-center justify-center">
                                    <item.icon className="w-6 h-6" />

                                </div>
                                <div>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>{item.description}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardFooter className="justify-end">
                                <Button  size="sm" className={item.status === "available" ? "hover:bg-black duration-300 " : "bg-primary/20 cursor-not-allowed"} disabled={item.status !== "available"} asChild>
                                    {item.status === "available" ? <Link href={item.link}>
                                        View Service
                                    </Link> : <span>Comming Soon</span>}

                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}


            </div>


        </>
    )
}