export const metadata = {
    title: "Settings | " + process.env.NEXT_PUBLIC_APP_NAME,
    description: "Manage your account settings and set e-mail preferences.",
    keywords: "settings, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}
export default function Layout({ children }: {
    children: React.ReactNode
}) {
    return (<>

        {children}

    </>)

}   