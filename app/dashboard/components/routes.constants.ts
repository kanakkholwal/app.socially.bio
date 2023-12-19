import { BsQrCodeScan } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { IoAnalytics, IoClose, IoLinkSharp } from "react-icons/io5";
import { LuPlusCircle } from "react-icons/lu";
import { RiLinksFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbLayout2 } from "react-icons/tb";
export type routeType = {
    title: string,
    items: {
        name: string,
        href: string,
        icon: React.ElementType
    }[]

}

export const routes :routeType[] = [
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
    {
        title: "Settings",
        items:[
            {
                name: "QR Code",
                href: "/dashboard/settings?view=qrcode",
                icon:BsQrCodeScan
            },
        ]
    },
]