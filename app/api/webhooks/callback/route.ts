
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: Response) {
    try {


  
        const url = new URL(request.url)

        const mode = url.searchParams.get("hub.mode")
        const token = url.searchParams.get("hub.verify_token")
        const challenge = url.searchParams.get("hub.challenge")
        console.log("mode", mode);
        console.log("token", token);
        console.log("challenge", challenge);
        


        return NextResponse.json(challenge);

    } catch (error: any) {
        return NextResponse.json({
            result: "fail",
            message: error?.message || 'Something went wrong',
            data: null
        }, { status: 500 });
    }
}
