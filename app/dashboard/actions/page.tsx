import { Metadata } from "next"


export const metadata :Metadata = {
    title: "Actions | Socially Bio",
    description: "Actions allows you to create automated tasks for your Social Media accounts actions like comment replies, in messages, and more.",
}
export default function Actions() {

    return (
        <div>
            <h3 className="text-4xl font-semibold text-slate-900">
                All Actions
            </h3>
            <p className="text-md font-regular  mt-5">
                Actions allows you to create automated tasks for your Social Media accounts actions like comment replies, in messages, and more.
            </p>

        </div>
    )
}