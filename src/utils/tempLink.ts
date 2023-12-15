import { NextResponse } from "next/server";
import TempLink from "src/models/tempLink";
import { SessionUserType } from "src/types/user";


export async function DeleteLinkBySlug(params:{
    slug: string;
}, user:SessionUserType) {
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
    return await link.deleteOne();
}
export async function createNewLink() {
    
}