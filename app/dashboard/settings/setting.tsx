"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SessionUserType } from 'src/types/user';
import Profile from './profile';
import QrCode from './qr-code';

import { createUrl } from "src/utils/router";


type TabItemType = {
    title: string,
    id: string,
    Component: React.ElementType
}
const TABLIST = [
    {
        title: "Profile",
        id: "profile",
        Component: Profile
    },
    {
        title: "QR Code",
        id: "qrcode",
        Component: QrCode
    },

] as TabItemType[]

export default function SettingsPage({user}:{
    user:SessionUserType
}) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();



    return (
        <>

            <div className="space-y-6 p-10 pb-16 w-full">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">
                        Manage your account settings and set e-mail preferences.
                    </p>
                </div>
                <Separator className="my-6" />
                <Tabs className="flex flex-col w-full space-y-8 lg:space-x-12 lg:space-y-0"
                    defaultValue={TABLIST[0].id}
                    value={searchParams.get("view") || TABLIST[0].id}
                >
                    <TabsList className=" lg:w-1/4 w-full  md:justify-start md:h-fit gap-2 rounded-full bg-tertiary/10 flex items-center justify-center">
                        {TABLIST.map((item: TabItemType) => {

                            // Base item params on current params so we can preserve any other param state in the url.
                            const itemSearchParams = new URLSearchParams(searchParams.toString());

                            // Update the item params using the current item to reflect how the url *would* change,
                            // if the item was clicked.
                            itemSearchParams.set("view", item.id);
                            const itemUrl = createUrl(pathname, itemSearchParams);
                            // The item is active if it's in the url params.
                            const isActive = searchParams.get("view") === item.id;  
                            return <TabsTrigger value={item.id} className="w-full py-2 px-4 rounded-3xl flex justify-center items-center gap-2 text-sm font-semibold  text-slate-600 hover:text-slate-800 hover:bg-tertiary/20" key={item.id}
                                onClick={() => {
                                    router.replace(itemUrl, { scroll: false });
                                }}
                            >{item.title}</TabsTrigger>
                        })}
                    </TabsList>
                    <div className="flex-1 lg:max-w-2xl">
                        {TABLIST.map((Item: TabItemType, index) => {
                            return <TabsContent value={Item.id} key={Item.id}>
                                <Item.Component user={user} />
                            </TabsContent>
                        })}

                    </div>
                </Tabs>
            </div>



        </>)
}



