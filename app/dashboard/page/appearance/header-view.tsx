"use client";

import Image from "next/image";
import { useHeaderStore } from "./store";



export default function HeaderView() {
    const [
        profileName,
        profilePicture,
        profileBio,
        displays
    ] = useHeaderStore(state => [state.profileName, state.profilePicture, state.profileBio, state.displays])
    return (<>
        <div className="flex-1">
            <div className={"flex flex-col items-center  pt-5 justify-" + displays.align}>
                <Image src={profilePicture} className="rounded-full w-32 h-32 mb-2 shadow-lg" draggable={false} height={256} width={256} alt="profilePicture" />
                <h1 className="text-3xl font-semibold text-slate-800">
                    {profileName}
                </h1>
                <p className="text-sm text-slate-600">
                    {profileBio}
                </p>
            </div>
        </div>



    </>)
}