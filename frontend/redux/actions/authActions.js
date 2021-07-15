import axios from "../../api/axios"
import { localStorageRemove, localStorageSet } from "../../utils/localStorage"
import { AUTH_REQUEST, AUTH_SET_ERROR, AUTH_SUCCESS, AUTH_SIGNOUT, AUTH_SET_USER } from "../constants/authConstants"

export const authLogin = (loginData) => async dispatch => {
    try {
        dispatch({ type: AUTH_REQUEST })
        const { data: { data: { token, user } } } = await axios.post('/auth/login', loginData)
        localStorageSet('token', token)
        localStorageSet('user', JSON.stringify(user))
        dispatch({ type: AUTH_SUCCESS, payload: { token, user } })
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : 'Server down'
        dispatch({ type: AUTH_SET_ERROR, payload: { errorMessage } })
    }
}

export const authSignup = (signupData) => async dispatch => {
    try {
        dispatch({ type: AUTH_REQUEST })
        const { data: { data: { token, user } } } = await axios.post('/auth/signup', signupData)
        localStorageSet('token', token)
        localStorageSet('user', JSON.stringify(user))
        dispatch({ type: AUTH_SUCCESS, payload: { token, user } })
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : 'Server down'
        dispatch({ type: AUTH_SET_ERROR, payload: { errorMessage } })
    }
}

export const authSignout = () => async dispatch => {
    localStorageRemove('token')
    localStorageRemove('user')
    dispatch({ type: AUTH_SIGNOUT })
}

export const authError = errorMessage => async dispatch => {
    dispatch({ type: AUTH_SET_ERROR, payload: { errorMessage } })
}

export const authSetUser = user => async dispatch => {
    localStorageSet('user', JSON.stringify(user))
    dispatch({ type: AUTH_SET_USER, payload: { user } })
}
