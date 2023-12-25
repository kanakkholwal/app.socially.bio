
import { NextResponse } from "next/server";
import dbConnect from "src/lib/dbConnect";
import Temp from "src/models/temp";

export async function GET(request: Request) {
    try {
    
        await dbConnect();
     
        await Temp.create({
            request: request
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
