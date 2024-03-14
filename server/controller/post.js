import Post from '../models/posts.js'

export const GetPost = (req, res) => {
    res.json({ msg: "this is working" })
}

export const Create = (req, res) => {
    console.log(Post)
    res.send("request aai ")
}