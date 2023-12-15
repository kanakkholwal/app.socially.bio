"use server"
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import dbConnect from "src/lib/dbConnect";
import TempLink from "src/models/tempLink";
import { SessionType } from "src/types/session";
import { TempLinkType } from "src/types/tempLink";


export const checkEnvironment = () => {
    let base_url =
        (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
            ? "http://localhost:3000"
            : "https://app.socially.bio"; // https://v2ds.netlify.app

    return base_url;
};
export async function deleteLink(link: TempLinkType) {
    const connection = await dbConnect();
    const session = await getServerSession(authOptions) as SessionType | null;
    if (!session) {
        throw new Error("Unauthorized");
    }
    return new Promise(async (resolve, reject) => {
        const linkInDb = await TempLink.findOne({
            slug: link.slug,
            creator: session.user._id.toString(),
        });
        if (!linkInDb) {
            return reject(new Error("Link not found"));
        }
        if (linkInDb.creator.toString() !== session.user._id.toString()) {
            return reject(new Error("Unauthorized"));
        }
        await TempLink.deleteOne({
            slug: link.slug,
            creator: session.user._id.toString(),
        }).then(() => {
            return resolve(true);
        }).catch((err) => {
            return reject(err);
        }).finally(() => {
            revalidatePath("/dashboard/links", "page");
            // connection?.close();
        })





    })
}