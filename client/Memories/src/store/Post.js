import { createSlice } from '@reduxjs/toolkit'

export const PostsSlice = createSlice({
    name: "Post",
    initialState: { Posts: [], post: [], isloading: true, recommendedPosts: [] },
    reducers: {
        GetPost: (state, action) => {
            state.Posts = action.payload
        },
        createPost: (state, action) => {
            state.Posts = [...state.Posts, action.payload];
        },
        deletePost: (state, action) => {
            state.Posts = state.Posts.filter((item) => {
                return item._id !== action.payload._id
            })
        },
        UpdatePost: (state, action) => {
            state.Posts = state.Posts.map((item) => {
                if (item._id === action.payload._id) {
                    item = action.payload;
                }
                return item
            });
        },
        like: (state, action) => {
            state.Posts = state.Posts.map((item) => {
                if (item._id == action.payload._id) {
                    item.likeCount = action.payload.likeCount
                    return item
                }
                return item
            })
        },
        GetPostBySearch: (state, action) => {
            state.Posts = action.payload
        },
        GetPostFromId: (state, action) => {
            state.isloading = false
            state.post = action.payload
        },
        setComment: (state, action) => {
            state.Posts = state.Posts.map((item) => {
                if (item._id === action.payload._id) {
                    item = action.payload
                }
                return item
            })
            state.post = action.payload
        },
        recommendedPostsSearch: (state, action) => {
            const updatedPayload = action.payload.filter(item => item._id !== state.post._id);
            state.recommendedPosts = updatedPayload;
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

export const SearchPostSlice = createSlice({
    name: 'SearchPost',
    initialState: [],
    reducers: {
        getSearchPost: (state, action) => {
            return state = action.payload
        }
    }
})

export const SearchPostAction = SearchPostSlice.actions
export const PostIdAction = PostIdSlice.actions
export const PostAction = PostsSlice.actions