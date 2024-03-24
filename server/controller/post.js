import mongoose from 'mongoose'
import Post from '../models/posts.js'
import User from '../models/user.js'

export const GetPost = async (req, res) => {
    const Posts = await Post.find({}).populate("creator")
    res.status(200).json(Posts)
}

export const Create = async (req, res) => {
    const postDetails = req.body
    const userId = req.userId

    try {
        const newPost = new Post(postDetails)
        const userPost = await User.findOne({ _id: userId })

        // Saving the id of user in post
        await newPost.creator.push(userPost)
        await newPost.save()

        res.status(201).json(newPost)
    } catch (err) {
        console.log(err)
    }
}

export const Delete = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Invalid Post Id" })
    const userId = req.userId

    try {
        const post = await Post.findOne({ _id: id })
        if (post.creator[0].equals(userId)) {
            const post = await Post.findOneAndDelete({ _id: id }, { new: true })
            res.status(200).json(post)
        } else {
            res.status(404).json({ msg: "You are not owner of this post" })
        }
    } catch (err) {
        console.log(err)
    }
}

export const Update = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Invalid Post" })
    const post = await Post.findById({ _id: id })
    res.status(200).json(post)
}

export const UpdatePost = async (req, res) => {
    const { _id } = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ msg: "Invalid Post" })
    const user = await User.findOne({ _id: req.userId })
    const postData = req.body

    try {
        if (user._id.equals(postData.creator[0])) {
            const post = await Post.findOneAndUpdate({ _id }, postData, { new: true })
            res.status(200).json(post)
        } else {
            res.status(404).json({ msg: 'You are not owner of this post' })
        }
    }
    catch (err) {
        console.log(err)
    }
}

export const like = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Invalid Post" })
    const user = req.userId

    const UpdatedPost = await Post.findById(id)

    if (UpdatedPost.LikeBy.includes(user)) {
        const UpdatedPost = await Post.findByIdAndUpdate(id, { $inc: { likeCount: -1 } }, { new: true })
        UpdatedPost.LikeBy.pop(user)
        UpdatedPost.save()
        res.status(200).json(UpdatedPost)
    } else {
        const UpdatedPost = await Post.findByIdAndUpdate(id, { $inc: { likeCount: 1 } }, { new: true })
        UpdatedPost.LikeBy.push(user)
        UpdatedPost.save()
        res.status(200).json(UpdatedPost)
    }
}
