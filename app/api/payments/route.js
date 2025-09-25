import { ConnectDB } from "../../lib/mongoose";
import { NextResponse } from "next/server";
import { Payment } from "@/app/models/Payment";

export async function GET(request) {
    await ConnectDB()
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const accHistory = await Payment.find({ RecieverId: username, done: true }, '_id payerName amount message').lean()
    console.log(accHistory);
    if (!accHistory) {
        return NextResponse.json({ message: "details Not found" }, { status: 404 })
    }
    return NextResponse.json({ accHistory }, { status: 200 })
}