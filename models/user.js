import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: stringify,
        required: true,
        unique: true
    },
    passworHash: {
        type: String,
        required: true
    },
    avatarUrl: String
}, {
    timestamps: true,
})

export default mongoose.model('User', UserSchema)