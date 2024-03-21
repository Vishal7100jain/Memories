import { configureStore, createSlice } from "@reduxjs/toolkit";

const Auth = createSlice({
    name: "Auth",
    initialState: null,
    reducers: {
        GoogleAuth: (state, action) => {
            localStorage.setItem("Profile", JSON.stringify({ ...action.payload }))
            return state = action.payload
        }
    }
})

export const AuthAction = Auth.actions
export default Auth
