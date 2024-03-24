import { createSlice } from "@reduxjs/toolkit";

const Auth = createSlice({
    name: "Auth",
    initialState: null,
    reducers: {
        Auth: (state, action) => {
            localStorage.setItem("Profile", JSON.stringify({ ...action.payload }))
            return state = action.payload
        }
    }
})

export const AuthAction = Auth.actions
export default Auth
