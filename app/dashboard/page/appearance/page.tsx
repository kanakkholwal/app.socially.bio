import HeaderContentEditor from "./content/header-editor";
import HeaderView from "./header-view";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function AppearancePage() {

    return (<div className="flex items-stretch gap-4 w-full h-full flex-wrap justify-center">


        <Tabs defaultValue="content" className="flex-1">
            <TabsList className="h-12 mb-5">
                <TabsTrigger value="content" className="px-4 py-2 text-lg">Content</TabsTrigger>
                <TabsTrigger value="appearance" className="px-4 py-2 text-lg ">Appearance</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="grid w-full gap-4">
                <HeaderContentEditor />
            </TabsContent>
            <TabsContent value="appearance" className="grid w-full gap-4">Change your Appearance here.</TabsContent>
        </Tabs>

        <div className="border border-border p-5 rounded-xl w-[40rem]">
            <h2 className="text-lg font-semibold text-slate-800 pb-4 w-full border-b border-border mb-5">
                Preview here
            </h2>
            <div className="w-[412px] h-[915px] rounded-xl shadow-2xl shadow-slate-200 border-4 border-border mx-auto p-2">
                <HeaderView />
            </div>
        </div>

    </div>)
}