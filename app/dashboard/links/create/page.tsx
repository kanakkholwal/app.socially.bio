import { CreateLinkForm } from "./create-form";


export const metadata = {
    title: "Create New Link | " + process.env.NEXT_PUBLIC_APP_NAME,
    description: "Shorten your link or make opener link"
}


import { RiLinksFill } from "react-icons/ri";

export default async function CreateLinkPage() {

    


    return (
        <div>
            <div className="flex items-center space-x-2">
                <RiLinksFill className="text-2xl" />
                <h1 className="text-2xl font-semibold text-slate-900">
                    Create New Link
                </h1>
            </div>
            <p className="text-md font-regular  mt-2">
                Create a new short link or make opener link
            </p>
            <div className="p-5 border-t border-border mt-5">
                <CreateLinkForm />
            </div>
        </div>
    )
}