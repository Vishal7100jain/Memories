import axios from 'axios'

const API = axios.create({ baseURL: "https://memories-a7kr.onrender.com/" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
        return req
    }
    return req
})

// All Post apis
export const fetchPost = (Post) => API.get(Post)
export const createPost = (newPostData) => API.post("create", newPostData)
export const deletePost = (PostId) => API.delete("delete/" + PostId)
export const getSinglePost = (PostId) => API.get("Update/" + PostId)
export const UpdatePost = (PostData) => API.patch("Update/", PostData)
export const Like = (id) => API.patch("like/" + id)
export const SearchPost = (PostDetails) => API.post("Search/", PostDetails)
export const getPostFromId = (Id) => API.get(`post/${Id}`)
export const postComment = (Id, value) => API.post(`/post/comment/${Id}`, value)

// User work Api
export const SignUp = (userData) => API.post("User/SignUp", userData)
export const Login = (userData) => API.post("User/SignIn", userData)
export const googleLogin = (userData) => API.post('user/google/login', userData)