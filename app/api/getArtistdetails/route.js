import { Artist } from "../../models/artists";
import { ConnectDB } from "../../lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    await ConnectDB()
    const username = request.nextUrl.searchParams.get('username')
    const artistdetails = await Artist.findOne({username:username},'name pic cover bio pronoun')
    if (!artistdetails) {
        return NextResponse.json({ error: "Artist Not Found" }, { status: 404 });
    }
    return NextResponse.json({artistdetails},{status:200}) 
}

