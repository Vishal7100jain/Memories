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
            console.log(action.payload)
            state.Posts = state.Posts.filter((item) => {
                return item._id !== action.payload._id
            })
        },
        UpdatePost: (state, action) => {
            console.log(action.payload)
            state.Posts = state.Posts.map((item) => {
                if (item._id === action.payload._id) {
                    return item = action.payload
                }
            })
        },
        like: (state, action) => {
            state.Posts = state.Posts.map((item) => {
                if (item._id == action.payload._id) {
                    item.likeCount = action.payload.likeCount
                    return item
                }
            })
        }
    }
})

export const PostIdSlice = createSlice({
    name: "PostId",
    initialState: "",
    reducers: {
        setPostId: (state, action) => {
            return state = action.payload
        }
    }
})

export const PostIdAction = PostIdSlice.actions
export const PostAction = PostsSlice.actions