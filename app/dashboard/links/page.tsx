

export const metadata = {
    title: "All Links | " + process.env.NEXT_PUBLIC_APP_NAME,
    description: "Checkout all your links here!"
}

export default function DashboardPage() {
    return (
        <>
            <h4 className="text-4xl font-semibold text-slate-900">
                All Links
            </h4>
            <p className="text-md font-regular  mt-5">
                Checkout all your links here!
            </p>

        </>
    )
}