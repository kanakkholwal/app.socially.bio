"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { VscChevronDown } from "react-icons/vsc";
import { SessionUserType } from "src/types/user";


export default function Navbar({ user }: { user: SessionUserType }) {
    return (
        <nav className="flex justify-between items-center w-full h-20 bg-white border-b border-border px-4 py-3">
            <div className="relative">

            </div>
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center space-x-2 hover:bg-slate-100 px-3 py-1.5 rounded-lg">
                            <Image src={user.profilePicture} height={80} width={80} alt="avatar" className="w-6 h-6 rounded-full" />
                            <span className="text-slate-500 text-md ml-2 font-medium  hidden md:inline-block">{user.name}</span>
                            <VscChevronDown className="text-slate-500" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={15} align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={"/dashboard/settings?defaultTabprofile=profile"} className="w-full text-accent-foreground hover:text-slate-800">
                                <FaRegUser className="w-3 h-3 mr-1" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <button onClick={(e) => {
                                e.preventDefault();
                                signOut();
                            }} className="w-full text-accent-foreground hover:text-slate-800">
                                <MdLogout className="w-3 h-3 mr-1" />
                                Log Out
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


            </div>
        </nav>
    )
}