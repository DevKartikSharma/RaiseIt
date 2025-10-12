import { User } from "../../models/User";
import bcrypt from "bcryptjs";
import { ConnectDB } from "../../lib/mongoose";

export async function POST(request) {
    await ConnectDB()
    const body = await request.json();
    let newUser = await new User({
        email: body.user.email,
        name: body.user.name,
        profilePic: body.user.profilePic,
        username: body.user.username,
        donations:0,
        password: await bcrypt.hash(body.user.password, 10)
    })
    await newUser.save();
    console.log('new user saved');
    return new Response(JSON.stringify({ message: "user Registered successfully" }), { status: 200 })
}
