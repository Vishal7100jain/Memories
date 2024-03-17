import mongoose from 'mongoose'
import Post from '../models/posts.js'

export const GetPost = async (req, res) => {
    const Posts = await Post.find()
    // await Post.deleteMany({}).then(res => console.log(res))
    res.status(200).json(Posts)
}

export const Create = async (req, res) => {
    const postDetails = req.body
    const newPost = await new Post(postDetails)
    await newPost.save()
    res.status(201).json(newPost)
}

export const Delete = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Invalid Post Id" })
    const post = await Post.findOneAndDelete({ _id: id })
    res.status(200).json(post)
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
    const postData = req.body
    const post = await Post.findOneAndUpdate({ _id }, postData, { new: true })
    res.status(200).json(post)
}

export const like = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Invalid Post" })
    const post = await Post.findById(id)
    const UpdatedPost = await Post.findByIdAndUpdate(id, { $inc: { likeCount: 1 } }, { new: true })
    res.status(200).json(UpdatedPost)
}