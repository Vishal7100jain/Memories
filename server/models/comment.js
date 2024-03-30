import mongoose, { mongo } from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
})

const comment = new mongoose.model('comment', commentSchema)
export default comment