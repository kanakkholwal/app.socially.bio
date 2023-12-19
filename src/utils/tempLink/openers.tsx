import { BsTwitterX, BsYoutube } from "react-icons/bs";
import { LuLinkedin } from "react-icons/lu";
import { PiInstagramLogoBold } from "react-icons/pi";
import { RiLinksFill } from "react-icons/ri";

export const OPENERS = [
    {
        label: "Youtube",
        id: "youtube",
        icon: <BsYoutube className="w-6 h-6 mr-2 text-red-600" />,
        getOpener: (url: string) => {
            return `vnd.youtube://${url}`
        }
    },
    {
        label: "X / Twitter",
        id: "twitter",
        icon: <BsTwitterX className="w-6 h-6 mr-2 text-slate-900" />,
        getOpener: (url: string) => {
            return `twitter://user?screen_name=${url}`;
        }
    },
    {
        label: "Instagram",
        id: "instagram",
        icon: <PiInstagramLogoBold className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (url: string) => {
            return `instagram://user?username=${url}`;
        }
    },
    {
        label: "LinkedIn",
        id: "linkedin",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (url: string) => {
            return `linkedin://profile/${url}`;
        }
    },
    {
        label: "Facebook",
        id: "facebook",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (url: string) => {
            return `fb://profile/${url}`;
        }
    },
        {
        label: "Slack",
        id: "slack",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (url:string) => {
            return `slack://channel?team=${url}`;
        }
        },{
        label: "Discord",
        id: "discord",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (url:string) => {
            return `discord://server/${url}`
        }
        }
    ,{
        label: "TikTok",
        id: "tiktok",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (url: string) => {
            return `tiktok://user/${url}`;
        }
    },{
        label: "Snapchat",
        id: "snapchat",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (url: string) => {
            return `snapchat://add/${url}`;
        }
    },{
        label: "Pinterest",
        id: "pinterest",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (url: string) => {
            return `pinterest://user/${url}`;
        }
    },{
        label: "Reddit",
        id: "reddit",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (url: string) => {
            return `reddit://user/${url}`;
        }
    },{
        label: "Tumblr",
        id: "tumblr",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (url: string) => {
            return `tumblr://x-callback-url/blog?blogName=${url}`;
        }
    },{
        label: "Telegram",
        id: "telegram",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (url: string) => {
            return `tg://resolve?domain=${url}`;
        }
    },{
        label: "Whatsapp",
        id: "whatsapp",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (phone: string) => {
            return `whatsapp://send?phone=${phone}`;
        }
    },{
        label: "Skype",
        id: "skype",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (phone: string) => {
            return `skype:${phone}?call`;
        }
    },{
        label: "Phone",
        id: "phone",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (phone: string) => {
            return `tel:${phone}`;
        }
    },{
        label: "Email",
        id: "email",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (email: string) => {
            return `mailto:${email}`;
        }
    },{
        label: "SMS",
        id: "sms",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (phone: string) => {
            return `sms:${phone}`;
        }
    },{
        label: "Maps",
        id: "maps",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: ({lat, lng}: {lat: string, lng: string}) => {
            return `maps://?q=${lat},${lng}`;
        }
    },{
        label: "Spotify",
        id: "spotify",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (url:string) => {
            return `spotify://user/${url}`
        }
    },
    {
        label: "Others",
        id: "others",
        icon: <RiLinksFill className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (url: string) => {
            return `googlechrome://${url}`;
        }
    },
] as {
    label: string,
    id: string,
    icon: React.ReactNode,
    getOpener?: (url: string) => string
}[];
