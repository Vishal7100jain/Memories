import { createSlice } from "@reduxjs/toolkit";

const Auth = createSlice({
    name: "Auth",
    initialState: null,
    reducers: {
        Auth: (state, action) => {
            localStorage.setItem("Profile", JSON.stringify({ ...action.payload }))
            state = action.payload
            return state
        },
        Logout: (state, action) => {
            localStorage.removeItem("Profile")
            state = null
            return state
        }
    }
})

export const AuthAction = Auth.actions
export default Auth
