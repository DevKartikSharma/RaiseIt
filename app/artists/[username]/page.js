import { Artist } from '../../models/artists';
import { ConnectDB } from '../../lib/mongoose';
import ArtistProfile from '@/app/components/ArtistProfile';


const artistCache = new Map();

const getArtistFromCache = async (username) => {
    try {
        if (artistCache.has(username)) {
            return artistCache.get(username);
        }
        await ConnectDB();
        const artist = await Artist.findOne(
            { username },
            'name pic cover bio pronoun'
        ).lean();

        artistCache.set(username, artist);

        return artist;
    } catch (e) {
        console.error('Error fetching artist from DB/cache:', e);
        return null;
    }
}

const User = async ({ params }) => {
    const username = params?.username;
    let details = await getArtistFromCache(username)
    if (!details) {
        return <div className="flex items-center justify-center min-h-screen text-white text-lg">
            User not found
        </div>
    }

    return <>
        <ArtistProfile username={username} Details={JSON.stringify(details)}  />
    </>
}

export default User
