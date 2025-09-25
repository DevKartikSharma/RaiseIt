import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
    Artistname: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    cover: { type: String },
    pic: { type: String },
    bio: { type: String },
    pronoun: { type: String },
    title: { type: String }
});

export const Artist = mongoose.models.Artist || mongoose.model('Artist', ArtistSchema);
