import React from 'react';
import { Artist } from '../../models/artists';
import { ConnectDB } from '../../lib/mongoose';
import ArtistProfile from '@/app/components/ArtistProfile';
import { Payment } from '@/app/models/Payment';



const User = async ({ params }) => {
    const username = params?.username;
    console.log(username);
    await ConnectDB()
    const details = await Artist.findOne({ username:username }, 'name pic cover bio pronoun').lean();
    if (!details) {
        return <div className="flex items-center justify-center min-h-screen text-white text-lg">
            User not found
        </div>
    }
    const accHistory = await Payment.find({ RecieverId:username,done:true}).lean()
    console.log(accHistory);
    
    return <>
        <ArtistProfile username={username} Details={JSON.stringify(details)} accHistory={JSON.stringify(accHistory)}/>
    </>
}

export default User
