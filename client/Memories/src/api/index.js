import axios from 'axios'

const url = 'http://localhost:5000/'

export const fetchPost = (Post) => axios.get(url + Post)

export const createPost = (newPostData) => axios.post(url + "create", newPostData)
export const deletePost = (PostId) => axios.delete(url + "delete/" + PostId)