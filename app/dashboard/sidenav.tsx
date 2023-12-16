"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrTransaction } from "react-icons/gr";
import { IoAnalytics, IoClose, IoLinkSharp } from "react-icons/io5";
import { LuPlusCircle } from "react-icons/lu";
import { RiLinksFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbLayout2 } from "react-icons/tb";


export type NavItem = {
    title: string,
    items: {
        name: string,
        href: string,
        icon: React.ElementType
    }[]

}

const nav_items :NavItem[] = [
    {
        title: "Temporary Link",
        items:[
            {
                name: "All Links",
                href: "/dashboard/links",
                icon:RiLinksFill
            },
            {
                name: "Add Link",
                href: "/dashboard/links/create",
                icon:LuPlusCircle
            },
        ]
    },
    {
        title: "My Page",
        items:[
            {
                name: "Appearance",
                href: "/dashboard/page",
                icon:TbLayout2
            },
            {
                name: "Links",
                href: "/dashboard/page/links",
                icon:IoLinkSharp
            },
            {
                name: "Analytics",
                href: "/dashboard/page/analytics",
                icon:IoAnalytics
            },
        ]
    },
    {
        title: "Actions",
        items:[
            {
                name: "All Actions",
                href: "/dashboard/actions",
                icon:GrTransaction
            },
        ]
    },
]

export default function Sidenav() {
    const pathname = usePathname();

    return (<>
    <div className="fixed lg:hidden inset-0 backdrop-blur-lg z-40 hidden" id="backdrop"></div>
    <div id="sidenav" className="sidenav w-64 h-full bg-tertiary/5 backdrop-blur-lg fixed lg:relative top-0 left-0 bottom-0 z-50 overflow-y-auto min-h-screen border-r border-tertiary/10">
        <div className="p-4 relative">
            <Link href="/dashboard" className="flex items-center justify-center">
                <Image src="/socially-bio.svg" alt="Socially Bio" width={200} height={200} className="w-44 h-12 user-select-none" draggable={false} priority/>
            </Link>
            <button className="absolute top-1 right-1 hover:bg-tertiary/20 rounded-xl p-1 text-slate-600 hover:text-slate-800 lg:hidden" id="sidenavClose">
                <IoClose className="w-4 h-4 text-inherit font-inherit"/>
            </button>
        </div>
        <div className="p-4 space-y-4">
            <Link href="/dashboard" className={"py-2 px-4 rounded-3xl flex justify-start items-center gap-2 text text-slate-600 hover:text-slate-800 font-medium hover:bg-tertiary/20" + (pathname=== "/dashboard"? " text-slate-800 bg-tertiary/20":"")}>
                <RxDashboard className="inline-block h-4 w-4 text-inherit font-inherit" /> Dashboard
            </Link>
            <div>
                {nav_items.map((item, i) => {
                    return (<div key={i} className="mb-3">
                        <h6 className="text-xs text-slate-700 uppercase font-semibold tracking-wider ml-4 mb-2">{item.title}</h6>
                        <ul className="space-y-1">
                            {item.items.map((item, i) => {
                                return (<li key={i}>
                                    <Link href={item.href} 
                                    className={"py-2 px-4 rounded-3xl flex justify-start items-center gap-2 text-sm font-semibold  text-slate-600 hover:text-slate-800 hover:bg-tertiary/20" + (pathname=== item.href ? " text-slate-800 bg-tertiary/20":"") }>
                                        <item.icon className="inline-block h-4 w-4 text-inherit font-inherit" /> {item.name}
                                    </Link>
                                </li>)
                            })}
                        </ul>
                    </div>)
                })}

            </div>
        </div>


    </div>
    </>)
}