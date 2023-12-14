
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "src/lib/dbConnect";
import TempLink from "src/models/tempLink";
import { SessionType } from "src/types/session";

export async function PUT(request: NextRequest,  { params }: { params: { slug: string }}) {
    try {
        const session = await getServerSession(authOptions) as SessionType;
        console.log(session);
        if (!session || !session.user) {
            return NextResponse.json({
                result: "fail",
                message: "You are not authenticated",
                data: null
            }, { status: 401 });
        }
        const { user } = session;
        await dbConnect();
        const res = await request.json();
        //  edit link
        const { url, expiresAt, opener } = res;
        console.log(res);
        const {slug} = params;

        const newLink = await TempLink.findOne({
            "_id": slug,
        });
        if (!newLink) {
            return NextResponse.json({
                result: "fail",
                message: "Link not found",
                data: null
            }, { status: 404 });
        }
        if (newLink.creator.toString() !== user?._id?.toString()) {
            return NextResponse.json({
                result: "fail",
                message: "You are not authorized to edit this link",
                data: null
            }, { status: 401 });
        }
        newLink.url = url;
        newLink.expiresAt = expiresAt;
        newLink.opener = opener;
        await newLink.save();
        

        return NextResponse.json({
            result: "success",
            message: "Link updated successfully",
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
export async function DELETE(request: NextRequest,  { params }: { params: { slug: string } }
    ) {
    try {
        const session = await getServerSession(authOptions) as SessionType | null;
        console.log(session);
        if (!session || !session.user) {
            return NextResponse.json({
                result: "fail",
                message: "You are not authenticated",
                data: null
            }, { status: 401 });
        }
        const { user } = session;
        await dbConnect();
        console.log(params);
        const link = await TempLink.findOne({
            slug: params.slug,
        });
        if (!link) {
            return NextResponse.json({
                result: "fail",
                message: "Link not found",
                data: null
            }, { status: 404 });
        }
        if (link.creator.toString() !== user._id?.toString()) {
            return NextResponse.json({
                result: "fail",
                message: "You are not authorized to edit this link",
                data: null
            }, { status: 401 });
        }
        await link.deleteOne();

        return NextResponse.json({
            result: "success",
            message: "Link deleted successfully",
            data: true
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            result: "fail",
            message: error?.message || 'Something went wrong',
            data: null
        }, { status: 500 });
    }
}
