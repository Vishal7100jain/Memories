import * as api from '../api/index.js'
import { PostAction, PostIdAction, SearchPostAction } from '../store/Post.js';

const withErrorHandling = async (dispatch, acitonFunction, actionCreate) => {
    try {
        const { data } = await acitonFunction();
        dispatch(actionCreate(data))
    } catch (error) {
        console.log(error)
    }
}

export const fetchData = () => async (dispatch) => {
    await withErrorHandling(
        dispatch,
        async () => await api.fetchPost("Post"),
        PostAction.GetPost
    )
}

export const createPost = (PostData) => async (dispatch) => {
    await withErrorHandling(
        dispatch,
        async () => await api.createPost(PostData),
        PostAction.createPost
    )
}

export const DeletePost = (PostId) => async (dispatch) => {
    await withErrorHandling(
        dispatch,
        async () => await api.deletePost(PostId),
        PostAction.deletePost
    )
}

export const PostToUpdate = (PostId) => async (dispatch) => {
    await withErrorHandling(
        dispatch,
        async () => await api.getSinglePost(PostId),
        PostIdAction.setPostId
    )
}

export const UpdatePost = (PostData) => async (dispatch) => {
    await withErrorHandling(
        dispatch,
        async () => await api.UpdatePost(PostData),
        PostAction.UpdatePost
    )
}

export const like = (Id) => async (dispatch) => {
    await withErrorHandling(
        dispatch,
        async () => await api.Like(Id),
        PostAction.like
    )
}

export const SearchPostActFun = (PostDetails) => async (dispatch) => {
    await withErrorHandling(
        dispatch,
        async () => await api.SearchPost(PostDetails),
        SearchPostAction.getSearchPost
    )
}