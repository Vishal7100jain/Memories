import { configureStore } from "@reduxjs/toolkit";
import { PostsSlice } from "./Post";

const store = configureStore({
    reducer: {
        Post: PostsSlice.reducer
    }
})

export default store