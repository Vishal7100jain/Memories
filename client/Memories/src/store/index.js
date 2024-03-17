import { configureStore } from "@reduxjs/toolkit";
import { PostIdSlice, PostsSlice } from "./Post";

const store = configureStore({
    reducer: {
        Post: PostsSlice.reducer,
        PostId: PostIdSlice.reducer
    }
})

export default store