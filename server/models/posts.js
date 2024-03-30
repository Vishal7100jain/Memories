import mongoose, { mongo } from "mongoose";
import commentModel from './comment.js'

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

    LikeBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],

    likeCount: {
        type: Number,
        default: 0
    },

    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],

    createdAt: {
        type: Date,
        default: new Date()
    }
})

postSchema.post("findOneAndDelete", async (post) => {
    if (post) {
        await commentModel.deleteMany({ _id: { $in: post.comment } })
    }
})

const Post = new mongoose.model("Post", postSchema)
export default Post

