import { createSlice } from '@reduxjs/toolkit'

export const PostsSlice = createSlice({
    name: "Post",
    initialState: { Posts: [] },
    reducers: {
        GetPost: (Post, action) => {
            Post.Posts = action.payload
        },
        createPost: (state, action) => {
            state.Posts = [...state.Posts, action.payload];
        },
        deletePost: (state, action) => {
            state.Posts = state.Posts.filter((item) => {
                return item._id !== action.payload._id
            })
        }
    }
})

export const PostAction = PostsSlice.actions