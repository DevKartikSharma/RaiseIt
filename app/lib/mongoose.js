import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const uri = process.env.MONGODB_URI

if (!uri) {
    throw new Error('please save a mongodb connection string in you env file first')
}
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function ConnectDB() {
    if (cached.conn) return cached.conn

    if (!cached.promise) {
        cached.promise = mongoose.connect(uri, {
            bufferCommands: false,
        }).then((mongoose) => {
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}