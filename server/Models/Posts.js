import mongoose from "mongoose";

const PostsModel = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    text: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    tags: [{type: Array}],
    imageUrl: String,
    viewsCount: {type: Number, default: 0}
}, {timestamps: true})

export default mongoose.model('Posts', PostsModel)