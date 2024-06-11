import axios from "axios"
import { 
    ALL_ADDRESSES_FAILURE, 
    ALL_ADDRESSES_REQUEST, 
    ALL_ADDRESSES_SUCCESS, 
    CLEAR_ERRORS, 
    CREATE_ADDRESS_REQUEST, 
    CREATE_ADDRESS_SUCCESS, 
    DELETE_ADDRESS_FAILURE, 
    DELETE_ADDRESS_REQUEST, 
    DELETE_ADDRESS_SUCCESS, 
    UPDATE_ADDRESS_FAILURE, 
    UPDATE_ADDRESS_REQUEST, 
    UPDATE_ADDRESS_SUCCESS 
} from "../constants/addressConstants"

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const getAllAddresses = () => async dispatch => {
    try {
        dispatch({ type: ALL_ADDRESSES_REQUEST })

        const { data } = await axios.get(`/api/v1/addresses`)

        dispatch({
            type: ALL_ADDRESSES_SUCCESS,
            payload: data?.addresses
        })

    } catch (error) {
        dispatch({
            type: ALL_ADDRESSES_FAILURE,
            payload: error?.response?.data?.message
        })
    }
}

export const createAddress = (id, address) => async dispatch => {
    try {
        dispatch({ type: CREATE_ADDRESS_REQUEST })

        const { data } = await axios.post(
            `/api/v1/addresses/${id}`,
            address,
            config
        )

        dispatch({
            type: CREATE_ADDRESS_SUCCESS,
            payload: data?.success
        })

    } catch (error) {
        dispatch({
            type: ALL_ADDRESSES_FAILURE,
            payload: error?.response?.data?.message
        })
    }
}

export const updateAddress = (id, address) => async dispatch => {
    try {
        dispatch({ type: UPDATE_ADDRESS_REQUEST })

        const { data } = await axios.put(
            `/api/v1/addresses/${id}`,
            address,
            config
        )

        dispatch({
            type: UPDATE_ADDRESS_SUCCESS,
            payload: data?.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ADDRESS_FAILURE,
            payload: error?.response?.data?.message
        })
    }
}

export const deleteAddress = addressId => async dispatch => {
    try {
        dispatch({ type: DELETE_ADDRESS_REQUEST })

        const { data } = await axios.delete(`/api/v1/addresses/${addressId}`)

        dispatch({
            type: DELETE_ADDRESS_SUCCESS,
            payload: data?.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ADDRESS_FAILURE,
            payload: error?.response?.data?.message
        })
    }
}

// Clearing errors
export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    })
}