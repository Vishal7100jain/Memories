import Post from '../models/posts.js'

export const GetPost = async (req, res) => {
    const Posts = await Post.find()
    res.status(200).json(Posts)
}

export const Create = async (req, res) => {
    const postDetails = req.body
    const newPost = await new Post(postDetails)
    await newPost.save()
    res.status(201).json(newPost)
}