import { customAlphabet, urlAlphabet } from 'nanoid';

import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import dbConnect from "src/lib/dbConnect";
import TempLink from "src/models/tempLink";
import { parse } from 'tldjs';


const generateUrlSlug = (length: number = 8): string => customAlphabet(urlAlphabet, length)();

async function createLink(url: string, expiresAt: string, opener: string,user: any) {
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
            expiresAt,
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
const verifyUrl = (url: string): any => {
    return parse(url);
};
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        console.log(session);
        if (!session) {
            return NextResponse.json({
                result: "fail",
                message: "You are not authenticated",
                data: null
            }, { status: 401 });
        }
        const { user } = session;
        await dbConnect();
        const res = await request.json();

        const { url, expiresAt, opener } = res;

        if(!expiresAt || !opener) {
            return NextResponse.json({
                result: "fail",
                message: "Invalid data (expiresAt or opener is missing)",
                data: null
            }, { status: 400 });
            
        }

        const isUrlValid = verifyUrl(url);
        if (!isUrlValid) {
            return NextResponse.json({
                result: "success",
                message: "Invalid URL",
                data: null
            }, { status: 200 });
        }
        const newLink = await createLink(url, expiresAt, opener,user);

        return NextResponse.json({
            result: "success",
            message: "Link created successfully",
            data: newLink
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            result: "fail",
            message: error?.message || 'Something went wrong',
            data: null
        }, { status: 500 });
    }
}
