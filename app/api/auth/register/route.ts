import dbConnect from "src/lib/dbConnect";
import User from "src/models/user";


export async function POST(request: Request) {
    await dbConnect();
    const res = await request.json();
    console.log(res)
    const { email, username, password } = res;
    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
        return Response.json({
            result: "fail",
            message: "user is already registered"
        })
    }
    const newUser = await User.create({email, username, password });

    await newUser.save()

    return Response.json({
        result: "success",
        message: "user is registered successfully"
    })
}
