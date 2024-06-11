import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    CLEAR_ERRORS,
} from '../constants/userConstants'
import axios from 'axios'

// Login a user
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post(
            '/api/v1/login',
            { email, password },
            config
        )

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response.data.message
        })
    }
}

// Register a new user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(
            '/api/v1/register',
            userData,
            config
        )

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response.data.message
        })
    }
}

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/v1/me')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data?.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAILURE,
            payload: error.response.data.message
        })
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/logout')

        dispatch({ type: LOGOUT_SUCCESS })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAILURE,
            payload: error.response.data.message
        })
    }
}

// Update profile
export const updateProfile = (userData) => async (dispatch) => {
    console.log('userData', userData)
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(
            '/api/v1/me/update',
            userData,
            config
        )

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAILURE,
            payload: error.response.data.message
        })
    }
}

// Update password
export const updatePassword = passwords => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
            '/api/v1/password/update',
            passwords,
            config
        )

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAILURE,
            payload: error.response.data.message
        })
    }
}

// Forgot password
export const forgotPassword = email => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/v1/password/forgot',
            email,
            config
        )

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        )

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAILURE,
            payload: error.response.data.message
        })
    }
}

// Update Profile Cover
// export const updateProfileCover = (userData) => async (dispatch) => {
//     try {
//         dispatch({ type: UPDATE_COVER_REQUEST })

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }

//         const { data } = await axios.put(
//             '/api/v1/me/cover/update',
//             userData,
//             config
//         )

//         dispatch({
//             type: UPDATE_COVER_SUCCESS,
//             payload: data.success
//         })
//     } catch (error) {
//         dispatch({
//             type: UPDATE_COVER_FAILURE,
//             payload: error.response.data.message
//         })
//     }
// }



// Clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
} 