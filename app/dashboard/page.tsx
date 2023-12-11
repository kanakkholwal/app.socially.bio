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
const quickAccess = [
    {
        title: "Page Appearance",
        description: "Change the appearance of your page",
        icon: "icon",
        link: "/dashboard/appearance",
        status: "available"
    },
    {
        title: "Analytics",
        description: "View analytics for your page",
        icon: "icon",
        link: "/dashboard/analytics",
        status: "available"
    },
    {
        title: "Create Links",
        description: "Create links for your page",
        icon: "icon",
        link: "/dashboard/links",
        status: "available"
    },
    {
        title: "Create Actions",
        description: "Create actions for your page",
        icon: "icon",
        link: "/dashboard/actions",
        status: "comming-soon"
    },

]

export default function DashboardPage() {
    return (
        <>
            <h4 className="text-4xl font-semibold text-slate-900">
                Quick Access
            </h4>
            <p className="text-md font-regular  mt-5">
                Welcome to your dashboard!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">

                {quickAccess.map((item, index) => {
                    return (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            {/* <CardContent>
                                <p>Card Content</p>
                            </CardContent> */}
                            <CardFooter className="justify-end">
                                <Button variant="outline" size="sm" disabled={item.status !== "available"} asChild>
                                    <Link href={item.link} className={item.status !== "available" ? "cursor-not-allowed":""}>
                                        {item.status === "available" ? "View Service" : "Comming Soon"}
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}


            </div>


        </>
    )
}