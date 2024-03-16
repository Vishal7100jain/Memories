import * as api from '../api/index.js'
import { PostAction } from '../store/Post.js';

export const fetchData = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPost("Post");
        dispatch(PostAction.GetPost(data))
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (PostData) => async (dispatch) => {
    try {
        const { data } = await api.createPost(PostData)
        dispatch(PostAction.createPost(data))
    } catch (error) {
        console.log(error.message)
    }
}

export const DeletePost = (PostId) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(PostId)
        dispatch(PostAction.deletePost(data))
    } catch (err) {
        console.log(err)
    }
}