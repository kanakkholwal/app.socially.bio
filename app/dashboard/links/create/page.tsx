import { CreateLinkForm } from "./create-link";


export const metadata = {
    title: "Create New Link | " + process.env.NEXT_PUBLIC_APP_NAME,
    description: "Shorten your link or make opener link"
}



export default async function CreateLinkPage() {

    


    return (
        <>
            <h4 className="text-4xl font-semibold text-slate-900">
                Create
            </h4>
            <p className="text-md font-regular  mt-5">
                Create a new Shorten Link
            </p>
            <div className="p-5 border-t border-border mt-5">
                <CreateLinkForm />
            </div>
        </>
    )
}