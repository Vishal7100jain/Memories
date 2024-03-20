import { configureStore, createSlice } from "@reduxjs/toolkit";

const Auth = createSlice({
    name: "Auth",
    initialState: null,
    reducers: {
        GoogleAuth: (state, action) => {
            localStorage.setItem("Profile", JSON.stringify({ ...action.payload.data }))
            return state = action.payload.data
        }
    }
})

export const AuthAction = Auth.actions
export default Auth
