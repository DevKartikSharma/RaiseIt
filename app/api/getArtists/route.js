import { Artist } from "../../models/artists";
import { ConnectDB } from "../../lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    await ConnectDB()
    const artistsdetails = await Artist.find({},'name username title pic')
    if (!artistsdetails) {
        return NextResponse.json({message:"details Not found"},{status:404}) 
    }
    return NextResponse.json({artistsdetails},{status:200}) 
}

