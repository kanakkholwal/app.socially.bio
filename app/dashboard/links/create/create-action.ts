"use server"
import { customAlphabet, urlAlphabet } from 'nanoid';

import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import dbConnect from "src/lib/dbConnect";
import TempLink from "src/models/tempLink";
import { SessionType } from 'src/types/session';
import { SessionUserType } from 'src/types/user';

const generateUrlSlug = (length: number = 8): string => customAlphabet(urlAlphabet, length)();

async function createLink(url: string, expiresAt: string, opener: string,user: SessionUserType) {
    const nanoid = generateUrlSlug(8);

    console.log("uid",nanoid);
    const isExist = await TempLink.findOne({
        slug: nanoid
    });
    if (isExist) {
        const nanoid = generateUrlSlug(8);
        const newLink = new TempLink({
            slug: nanoid,
            url: url,
            expiresAt:new Date(expiresAt),
            opener,
            creator: user.id
        });
        await newLink.save();
        return newLink;
    }
    const newLink = new TempLink({
        slug: nanoid,
        url: url,
        expiresAt,
        opener,
        creator: user._id

    });
    await newLink.save();
    return newLink;
}
export async function createTempLinkAction(link: {
    url: string,
    expiresAt: string,
    opener: string
}) {
    await dbConnect();
    const session = await getServerSession(authOptions) as SessionType | null;
    if (!session) {
        return new Promise((resolve, reject) => {
            return reject(new Error("Unauthorized"));
        })
    }
    return new Promise(async (resolve, reject) => {
        
        await createLink(link.url, link.expiresAt, link.opener,session.user).then((newLink) => {
            return resolve(JSON.parse(JSON.stringify(newLink)));
        }).catch((err) => {
            return reject(err);
        }).finally(() => {
            revalidatePath("/dashboard/links", "page");
            // connection?.close();
        })





    })
}