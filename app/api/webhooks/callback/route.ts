
import { NextResponse } from "next/server";
import dbConnect from "src/lib/dbConnect";
import Temp from "src/models/temp";

export async function POST(request: Request) {
    try {
    
        await dbConnect();
        const res = await request.json();
        console.log(res);
        await Temp.create({
            request: res
        });
        



        return NextResponse.json({
            result: "success",
            message: "request created successfully",
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            result: "fail",
            message: error?.message || 'Something went wrong',
            data: null
        }, { status: 500 });
    }
}
