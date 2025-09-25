import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    profilePic: { type: String, required: true },
    name: { type: String, required: true },
    donations: { type: Number, required: true },
    password: { type: String, required: true },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
