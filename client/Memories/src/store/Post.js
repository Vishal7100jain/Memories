import { createSlice } from '@reduxjs/toolkit'

export const PostsSlice = createSlice({
    name: "Post",
    initialState: { Posts: [] },
    reducers: {
        GetPost: (Post, action) => {
            Post.Posts = action.payload
        },
        createPost: (state, action) => {
            state.Posts = [action.payload];
        }
    }
})

export const PostAction = PostsSlice.actions