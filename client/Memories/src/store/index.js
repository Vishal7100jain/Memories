import { configureStore } from "@reduxjs/toolkit";
import { PostIdSlice, PostsSlice, SearchPostSlice } from "./Post";
import Auth from "./Auth";

const store = configureStore({
    reducer: {
        Post: PostsSlice.reducer,
        PostId: PostIdSlice.reducer,
        Auth: Auth.reducer,
        SearchPost: SearchPostSlice.reducer
    }
})

export default store