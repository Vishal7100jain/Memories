import { createSlice } from "@reduxjs/toolkit";

const Auth = createSlice({
    name: "Auth",
    initialState: null,
    reducers: {
        Auth: (state, action) => {
            localStorage.setItem("Profile", JSON.stringify({ ...action.payload }))
            return state = action.payload
        },
        Logout: (state, action) => {
            localStorage.removeItem("Profile")
            return state = null
        }
    }
})

export const AuthAction = Auth.actions
export default Auth
