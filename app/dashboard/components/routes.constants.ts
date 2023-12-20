import { BsQrCodeScan } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { IoAnalytics, IoLinkSharp } from "react-icons/io5";
import { LuPlusCircle } from "react-icons/lu";
import { RiLinksFill, RiUserSettingsLine } from "react-icons/ri";
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
                name: "Create New",
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
                href: "/dashboard/settings/qrcode",
                icon:BsQrCodeScan
            },
            {
                name: "Account",
                href: "/dashboard/settings/account",
                icon:RiUserSettingsLine
            },
        ]
    },
]