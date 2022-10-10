import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fullName: {type: String, required: true},
    avatarUrl: {
        type: String,
        default: 'https://gravatar.com/avatar/ebb873cf070c7652408b5f7af02720a0?s=400&d=robohash&r=x'
    },
    comments: [{type: mongoose.Types.ObjectId, ref: 'comments'}],
}, {timestamps: true})

export default mongoose.model('User', UserModel)