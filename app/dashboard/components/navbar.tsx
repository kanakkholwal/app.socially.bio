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
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { VscChevronDown } from "react-icons/vsc";
import { SessionUserType } from "src/types/user";
import Search from "./searchbar";

export default function Navbar({ user }: { user: SessionUserType }) {
    console.log(user);
    const router = useRouter();

    const togglerRef = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        const toggler = togglerRef.current;
        if (!toggler) return;

        const sidenavClose = document.querySelector("#sidenavClose") as HTMLButtonElement | null;
        if (!sidenavClose) return;
        const sidenav = document.querySelector("#sidenav") as HTMLDivElement | null;
        if (!sidenav) return;
        const backdrop = document.querySelector("#backdrop") as HTMLDivElement | null;
        if (!backdrop) return;

        const closeSidenav = () => {
            sidenav.classList.remove("open");
            backdrop.classList.add("hidden");
        }
        const toggleSidenav = () => {
            sidenav.classList.toggle("open");
            backdrop.classList.toggle("hidden");
        }
        toggler.addEventListener("click", toggleSidenav);
        sidenavClose.addEventListener("click", closeSidenav);
        
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeSidenav();
            }
        })
        document.addEventListener("mouseup", (e) => {
            if (sidenav.classList.contains("open") && !sidenav.contains(e.target as Node)) {
                closeSidenav();
            }
        })
        backdrop.addEventListener("click", closeSidenav);



        return () => {
            toggler.removeEventListener("click", toggleSidenav);
            sidenavClose.removeEventListener("click", closeSidenav);
            document.removeEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    closeSidenav();
                }
            })
            document.removeEventListener("mouseup", (e) => {
                if (sidenav.classList.contains("open") && !sidenav.contains(e.target as Node)) {
                    closeSidenav();
                }
            })
            backdrop.removeEventListener("click", closeSidenav);


        }
    }, [])

    return (
        <nav className="flex justify-between items-center w-full h-20 bg-white border-b border-border px-4 py-3">
            <div className="relative flex items-center gap-2">
                <button ref={togglerRef} className="text-slate-500 hover:text-slate-800 lg:hidden">
                    <CgMenuLeftAlt className="w-6 h-6" />
                    <span className="sr-only">Open sidenav</span>
                </button>
                <button 
                onClick={()=>{
                    router.back();
                }}
                title="Go Back"
                className="text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-full p-1 ">
                    <IoIosArrowBack className="w-5 h-5" />
                    <span className="sr-only">Go Back</span>
                </button>
                <Search />

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
                            <Link href={"/dashboard/settings?defaultTabprofile=profile"} className="w-full text-accent-foreground hover:text-slate-800">
                        <DropdownMenuItem>
                                <FaRegUser className="w-3 h-3 mr-1" />
                                Profile
                        </DropdownMenuItem>
                            </Link>
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