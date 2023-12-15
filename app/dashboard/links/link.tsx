"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { GrView } from "react-icons/gr";
import { LuCopy } from "react-icons/lu";
import { MdLockOpen, MdLockOutline, MdOutlineDeleteOutline, MdUpdate } from "react-icons/md";
import { TbHandClick } from "react-icons/tb";
import { TempLinkType } from "src/types/tempLink";
import { deleteLink } from "./delete-action";

export default function Item({ link }: {
    link: TempLinkType
}) {
    const [loading, setLoading] = React.useState(false);


    return (
    <div className="flex flex-col xs:flex-row justify-between items-center gap-3 mt-5 p-4 bg-slate-100 group rounded-lg border-transparent border border-dashed hover:border-tertiary/95 hover:bg-tertiary/10">
        <div className="flex flex-col">
            <h6 className="text-md font-semibold text-slate-900 flex flex-row items-center gap-2">
                {link.passwordProtected ? <MdLockOutline className="inline-block text-md  text-green-300 group-hover:text-green-600" /> : <MdLockOpen className="inline-block text-md text-primary/50 group-hover:text-primary" />}
                {process.env.NEXT_PUBLIC_APP_LINK}{link.slug}
                <LuCopy
                    onClick={() => {

                        toast.promise(navigator.clipboard.writeText(process.env.NEXT_PUBLIC_APP_LINK + link.slug), {
                            loading: 'Copying to clipboard...',
                            success: 'Copied to clipboard!',
                            error: 'Failed to copy to clipboard!'
                        })
                    }}

                    className="inline-block ml-2 text-md text-slate-500 hover:text-slate-900 cursor-pointer" />
            </h6>
            <p className="text-sm font-regular text-slate-500 text-ellipsis overflow-hidden max-w-xl">{link.url}</p>
            <div className="flex flex-row items-center gap-2 flex-wrap xs:flex-nowrap mt-2 w-full justify-start">
                <span className="text-sm font-regular text-slate-500">
                    <GrView className="inline-block w-4 h-4 text-inherit text-slate-500 mr-1" />

                    Views: {link.visits}</span>
                <span className="text-sm font-regular text-slate-500">
                    <TbHandClick className="inline-block w-4 h-4 text-inherit text-slate-500 mr-1" />
                    Clicks: {link.hits}</span>
                <span className="text-sm font-regular text-slate-500">
                    <MdUpdate className="inline-block w-4 h-4 text-inherit text-slate-500 mr-1" />
                    Expires at {new Date(link.expiresAt).toLocaleDateString()}
                
                    </span>

            </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
            <Link href={`/dashboard/links/${link.slug}/edit`}>
                <Button className="text-sm px-4 py-2 tracking-wide bg-primary text-white hover:bg-primary/90"
                    size="sm"
                    disabled={loading}
                >
                    Edit
                </Button>
            </Link>
            <Button
                size="sm"
                className="bg-red-100 text-red-600 hover:bg-red-200"
                disabled={loading}
                onClick={() => {
                    setLoading(true);
                    toast.promise(deleteLink(link), {
                        loading: 'Deleting link...',
                        success: () => {
                            setLoading(false);
                            return 'Link deleted successfully!'
                        },
                        error: (err) => {
                            setLoading(false);
                            return err.message
                        }
                    })

                }}
            >
                <MdOutlineDeleteOutline className="inline-block text-inherit" />
            </Button>
        </div>
    </div>)
}