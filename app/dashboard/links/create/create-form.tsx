"use client";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { BsTwitterX, BsYoutube } from "react-icons/bs";
import { LuLinkedin } from "react-icons/lu";
import { PiInstagramLogoBold } from "react-icons/pi";
import { RiLinksFill } from "react-icons/ri";
import { TbFidgetSpinner } from "react-icons/tb";

import toast from "react-hot-toast";
import { parse } from 'tldjs';
import { createTempLinkAction } from "./create-action";

interface StateType {
    url: string,
    isUrlValid: null | boolean,
    expiresAt: Date,
    opener: string,
    shortUrl: string,
    action: {
        loading: boolean,
        error: boolean,
        success: boolean,
        message: string
    }
}





const verifyUrl = (url: string): any => {
    return parse(url);
};

const openers = [
    {
        label: "Youtube",
        id: "youtube",
        icon: <BsYoutube className="w-6 h-6 mr-2 text-red-600" />
    },
    {
        label: "X / Twitter",
        id: "twitter",
        icon: <BsTwitterX className="w-6 h-6 mr-2 text-slate-900" />
    },
    {
        label: "Instagram",
        id: "instagram",
        icon: <PiInstagramLogoBold className="w-6 h-6 mr-2 text-violet-900" />
    },
    {
        label: "LinkedIn",
        id: "linkedin",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />
    },
    {
        label: "Others",
        id: "others",
        icon: <RiLinksFill className="w-6 h-6 mr-2 text-violet-900" />
    },
] as {
    label: string,
    id: string,
    icon: React.ReactNode
}[]
export function CreateLinkForm() {
    const [url, setUrl] = useState<string>("");
    const [isUrlValid, setIsUrlValid] = useState<boolean | null>(null);
    const [expiresAt, setExpiresAt] = useState<Date>(new Date(Date.now() + 24 * 60 * 60 * 1000));
    const [opener, setOpener] = useState<string>("others");
    const [shortUrl, setShortUrl] = useState<string>("");
    const [action, setAction] = useState<{
        loading: boolean,
        error: boolean,
        success: boolean,
        message: string
    }>({
        loading: false,
        error: false,
        success: false,
        message: ""
    });



    return (
        <div className="border border-border p-4 lg:p-6 rounded-2xl max-w-3xl space-y-5 mx-auto">
            <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="url" className="mb-3">
                    Your link to shorten
                </Label>
                <Input placeholder="Enter URL"
                    id="url"
                    variant="fluid"
                    type="text"
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value);
                        const url = verifyUrl(e.target.value);
                        if (url.isValid) {
                            setIsUrlValid(true);
                        } else {
                            setIsUrlValid(false);
                        }
                    }}
                    className={"w-full " + (isUrlValid === false ? "border-red-500" : "")}
                />
                {isUrlValid === false && <p className="text-red-500 text-sm">Invalid URL</p>}
            </div>
            <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="expiresAt">
                    Link will automatically expire on
                </Label>
                <DatePicker
                    value={expiresAt}
                    onChange={setExpiresAt}
                />
            </div>
            <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="expiresAt">
                    Select a link Opener
                </Label>
                <div className="flex justify-start gap-3 w-full items-center flex-wrap  mt-3">
                    {openers.map((opener_type, i) => {
                        return (<button
                            onClick={() => {
                                if (opener === opener_type.id)
                                    return;

                                setOpener(opener_type.id);
                            }}
                            className={"h-12 w-max  rounded-xl p-3 hover:bg-primary/5 border border-border flex items-center justify-center" + (opener === opener_type.id ? " border-primary bg-primary/10 hover:bg-primary/10" : "")} key={opener_type.id}>
                            {opener_type.icon}
                            <span className="text-lg font-medium text-slate-900">
                                {opener_type.label}
                            </span>
                        </button>)
                    })}

                </div>
            </div>
            <div className="flex justify-center items-center flex-wrap gap-2">
                {(action.error) && <>
                    <p className={"px-5 py-2 rounded-md text-sm " + (action.error ? " bg-red-200 text-red-500" : "") + " " + (action.error ? " bg-green-200 text-green-500" : "")}>
                        {action.message}
                    </p>

                </>}
                {action.success && <>
                    <p className="px-5 py-2 rounded-md text-sm bg-primary/10 text-primary">
                        <a href={process.env.NEXT_PUBLIC_APP_LINK + shortUrl} target="_blank" className="underline">
                            {process.env.NEXT_PUBLIC_APP_LINK}{shortUrl}
                        </a>
                        <button className="ml-2" onClick={() => {
                            navigator.clipboard.writeText(process.env.NEXT_PUBLIC_APP_LINK + shortUrl);
                            toast.success("Copied to clipboard")
                        }
                        }>
                            Copy
                        </button>

                    </p>
                </>}
                {action.loading && <>
                    <TbFidgetSpinner className="h-12 w-12 text-primary animate-spin" />
                </>}
            </div>
            <Button className="w-full" size="lg"
                onClick={() => {
                    if (url.trim() === "" || isUrlValid === false) {
                        toast.error("Enter a valid url");
                        return;
                    }

                    console.log(url, expiresAt, opener)
                    toast.promise(createTempLinkAction({
                        url: url,
                        expiresAt: expiresAt.toISOString(),
                        opener: opener
                    }), {
                        loading: "Generating Shorten Link",
                        success: (data: any) => {
                            console.log(data);
                            setShortUrl(data.slug);
                            setAction({
                                loading: false,
                                error: false,
                                success: true,
                                message: "Shorten Link Generated"
                            })
                            return "Shorten Link Generated"
                        },
                        error: (err: any) => {
                            setAction({
                                loading: false,
                                error: true,
                                success: false,
                                message: "Error Generating Shorten Link"
                            })

                            return "Error Generating Shorten Link"
                        }
                    })


                }}
                disabled={action.loading}>
                Generate Shorten Link
            </Button>


        </div>
    );
}
