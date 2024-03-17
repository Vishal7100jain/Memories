import axios from 'axios'

const url = 'http://localhost:5000/'

export const fetchPost = (Post) => axios.get(url + Post)
export const createPost = (newPostData) => axios.post(url + "create", newPostData)
export const deletePost = (PostId) => axios.delete(url + "delete/" + PostId)
export const getSinglePost = (PostId) => axios.get(url + "Update/" + PostId)
export const UpdatePost = (PostData) => axios.patch(url + "Update/", PostData)
export const Like = (id) => axios.patch(url + "like/" + id)