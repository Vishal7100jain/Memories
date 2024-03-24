import * as api from '../api/index.js'
import { AuthAction } from '../store/Auth.js'

const withErrorHandling = async (dispatch, actionFunction, actionCreate) => {
    try {
        const { data } = await actionFunction()
        dispatch(actionCreate(data))
    } catch (err) {
        console.log(err)
    }
}

export const signUp = (userData, history) => async (dispatch) => {
    await withErrorHandling(dispatch, async () => await api.SignUp(userData), AuthAction.Auth)
    history("/")
}

export const signIn = (userData, history) => async (dispatch) => {
    await withErrorHandling(dispatch, async () => await api.Login(userData), AuthAction.Auth)
    history("/")
}

//google login
export const googleLogin = (userData, history) => async (dispatch) => {
    await withErrorHandling(dispatch, async () => await api.googleLogin(userData), AuthAction.Auth)
    history("/")
}