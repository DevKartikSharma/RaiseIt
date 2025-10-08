import { ConnectDB } from "@/app/lib/mongoose";
import { User } from "../../models/User";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        const body = await request.json()
        const { username, donation } = body
        await ConnectDB()
        const user = await User.findOneAndUpdate({ username: username }, { donations: donation }, { new: true })
        if (!user) {
            console.log('usernot found');
            return NextResponse.json({ message: 'User not found' ,success:false}, { status: 404 })
        }
        console.log('updated');
        return NextResponse.json({ message: 'donations updated', success:true })
    } catch (e) {
        console.log('error');
        return NextResponse.json({ message: 'internal server error' ,success:false}, { status: 500 })
    }
}