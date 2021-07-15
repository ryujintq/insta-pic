import { localStorageGet } from "../../utils/localStorage"
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_SET_ERROR, AUTH_SIGNOUT, AUTH_SET_USER } from "../constants/authConstants"

const initialState = {
    token: localStorageGet('token') || '',
    user: localStorageGet('user') ? JSON.parse(localStorageGet('user')) : {},
    errorMessage: '',
    loading: false
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case AUTH_REQUEST:
            return { ...state, loading: true }
        case AUTH_SUCCESS:
            const { token, user } = payload
            return { token, user, loading: false, errorMessage: '' }
        case AUTH_SIGNOUT:
            return { token: '', user: {}, loading: false, errorMessage: '' }
        case AUTH_SET_USER:
            const { user: newUser } = payload
            console.log(newUser)
            return { ...state, user: newUser }
        case AUTH_SET_ERROR:
            const { errorMessage } = payload
            return { ...state, errorMessage, loading: false }
        default:
            return state
    }
}

export default authReducer
