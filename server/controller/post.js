import mongoose from 'mongoose'
import Post from '../models/posts.js'
import User from '../models/user.js'
const count = 0

export const GetPost = async (req, res) => {
    const Posts = await Post.find().populate("creator")
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
            console.log("you are not the owner")
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
            console.log("not updated")
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

export const SearchPost = async (req, res) => {
    const { postTitle } = req.body
    const { tags } = req.body

    let postFindedByTitle = []
    let PostFindedByTags = []

    if (postTitle) {
        postFindedByTitle = await Post.find({ title: { $regex: postTitle } }).populate("creator")
    }

    if (tags !== undefined && tags.length != 0) {
        PostFindedByTags = await Post.find({ tags: { $regex: tags.toString() } })
            .populate("creator")
    }

    const posts = [...postFindedByTitle, ...PostFindedByTags]
    res.status(200).json(posts)
}

// Post.deleteMany({}).then(res => console.log(res))

// const postData = [
//     {
//         title: "Sunny Day in the Park",
//         message: "Enjoying a sunny day in the park with friends. ☀🌳",
//         creator: ["660067668f9a66790c1297de"],
//         tags: ["park", "friends", "sunshine"],
//         selectedFile: "https://example.com/sunny_park.jpg",
//         LikeBy: ["660067668f9a66790c1297de"],
//         likeCount: 1,
//         createdAt: new Date()
//     },
//     {
//         title: "Breathtaking Northern Lights",
//         message: "Witnessed the breathtaking Northern Lights on a chilly winter night. 🌌💫",
//         creator: ["660067668f9a66790c1297de"],
//         tags: ["northern lights", "winter", "nature"],
//         selectedFile: "https://example.com/northern_lights.jpg",
//         LikeBy: ["660067668f9a66790c1297de"],
//         likeCount: 1,
//         createdAt: new Date()
//     },
//     {
//         title: "Relaxing Yoga Session",
//         message: "Starting the day with a relaxing yoga session. 🧘‍♀",
//         creator: ["660067668f9a66790c1297de"],
//         tags: ["yoga", "morning", "relaxation"],
//         selectedFile: "https://example.com/yoga_session.jpg",
//         LikeBy: ["660067668f9a66790c1297de"],
//         likeCount: 1,
//         createdAt: new Date()
//     },
//     {
//         title: "Exploring a New City",
//         message: "Exploring a new city and discovering hidden gems. 🏙🚶‍♂",
//         creator: ["660067668f9a66790c1297de"],
//         tags: ["city", "travel", "exploration"],
//         selectedFile: "https://example.com/new_city.jpg",
//         LikeBy: ["660067668f9a66790c1297de"],
//         likeCount: 1,
//         createdAt: new Date()
//     },
//     {
//         title: "Festive Christmas Decorations",
//         message: "Decorating the house for Christmas. 🎄🎅",
//         creator: ["660067668f9a66790c1297de"],
//         tags: ["christmas", "decorations", "holidays"],
//         selectedFile: "https://example.com/christmas_decorations.jpg",
//         LikeBy: ["660067668f9a66790c1297de"],
//         likeCount: 1,
//         createdAt: new Date()
//     },
//     {
//         title: "Summer Road Trip",
//         message: "Going on a summer road trip with friends. 🚗🌅",
//         creator: ["660067668f9a66790c1297de"],
//         tags: ["road trip", "summer", "friends"],
//         selectedFile: "https://example.com/summer_road_trip.jpg",
//         LikeBy: ["660067668f9a66790c1297de"],
//         likeCount: 1,
//         createdAt: new Date()
//     },
//     {
//         title: "Sunny Park Day",
//         message: "Enjoying a sunny day in the park with friends. ☀🌳",
//         creator: ['660067668f9a66790c1297de'],
//         tags: ["park", "friends", "sunshine"],
//         selectedFile: "https://example.com/sunny_park.jpg",
//         LikeBy: ['660067668f9a66790c1297de'],
//         likeCount: 3,
//         createdAt: new Date()
//     },
//     {
//         title: "Homemade Chocolate Cake",
//         message: "Baked a delicious chocolate cake today. Who wants a slice? 🍰🍫",
//         creator: ['660067668f9a66790c1297de'],
//         tags: ["cake", "baking", "chocolate"],
//         selectedFile: "https://example.com/chocolate_cake.jpg",
//         LikeBy: ['660067668f9a66790c1297de'],
//         likeCount: 3,
//         createdAt: new Date()
//     },
//     {
//         title: "Stunning Mountain View",
//         message: "Reached the summit and captured this breathtaking view of the mountains. ⛰🌄",
//         creator: ['660067668f9a66790c1297de'],
//         tags: ["mountains", "hiking", "nature"],
//         selectedFile: "https://example.com/mountain_view.jpg",
//         LikeBy: ['660067668f9a66790c1297de'],
//         likeCount: 3,
//         createdAt: new Date()
//     },
//     {
//         title: "Lazy Sunday Morning",
//         message: "Relaxing with a cup of coffee on this lazy Sunday morning. ☕",
//         creator: ['660067668f9a66790c1297de'],
//         tags: ["morning", "coffee", "relaxation"],
//         selectedFile: "https://example.com/sunday_morning.jpg",
//         LikeBy: ['660067668f9a66790c1297de'],
//         likeCount: 3,
//         createdAt: new Date()
//     }, {
//         title: "Sunny Day in the Park",
//         message: "Enjoying a sunny day in the park with friends. ☀🌳",
//         creator: ["660067668f9a66790c1297de"],
//         tags: ["park", "friends", "sunshine"],
//         selectedFile: "https://example.com/sunny_park.jpg",
//         LikeBy: ["660067668f9a66790c1297de"],
//         likeCount: 3,
//         createdAt: new Date()
//     },
//     {
//         title: "Homemade Chocolate Cake",
//         message: "Baked a delicious chocolate cake today. Who wants a slice? 🍰🍫",
//         creator: ["660067668f9a66790c1297de"],
//         tags: ["cake", "baking", "chocolate"],
//         selectedFile: "https://example.com/chocolate_cake.jpg",
//         LikeBy: ["660067668f9a66790c1297de"],
//         likeCount: 3,
//         createdAt: new Date()
//     },
//     {
//         title: "Stunning Mountain View",
//         message: "Reached the summit and captured this breathtaking view of the mountains. ⛰🌄",
//         creator: ["660067668f9a66790c1297de"],
//         tags: ["mountains", "hiking", "nature"],
//         selectedFile: "https://example.com/mountain_view.jpg",
//         LikeBy: ["660067668f9a66790c1297de"],
//         likeCount: 3,
//         createdAt: new Date()
//     },
//     {
//         title: "Lazy Sunday Morning",
//         message: "Relaxing with a cup of coffee on this lazy Sunday morning. ☕",
//         creator: ["660067668f9a66790c1297de"],
//         tags: ["morning", "coffee", "relaxation"],
//         selectedFile: "https://example.com/sunday_morning.jpg",
//         LikeBy: ["660067668f9a66790c1297de"],
//         likeCount: 3,
//         createdAt: new Date()
//     }
// ]

// Post.insertMany(postData).then(res => console.log(res))

