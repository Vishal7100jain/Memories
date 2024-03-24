import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        requried: true
    },
    message: {
        type: String,
        requried: true
    },
    creator: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],

    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Post = new mongoose.model("Post", postSchema)
export default Post