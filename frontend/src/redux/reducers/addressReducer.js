import {
    ALL_ADDRESSES_FAILURE,
    ALL_ADDRESSES_REQUEST,
    ALL_ADDRESSES_SUCCESS,
    ALL_COUNTRIES_FAILURE,
    ALL_COUNTRIES_REQUEST,
    ALL_COUNTRIES_SUCCESS,
    ALL_STATES_FAILURE,
    ALL_STATES_REQUEST,
    ALL_STATES_SUCCESS,
    CLEAR_ERRORS,
    CREATE_ADDRESS_FAILURE,
    CREATE_ADDRESS_REQUEST,
    CREATE_ADDRESS_RESET,
    CREATE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAILURE,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_RESET,
    DELETE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAILURE,
    UPDATE_ADDRESS_REQUEST,
    UPDATE_ADDRESS_RESET,
    UPDATE_ADDRESS_SUCCESS
} from '../constants/addressConstants'

export const getAddressesReducer = (state = { addresses: [] }, action) => {
    switch (action.type) {
        case ALL_ADDRESSES_REQUEST:
            return {
                ...state,
                loading: true,
                addresses: []
            }

        case ALL_ADDRESSES_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: action.payload,
            }

        case ALL_ADDRESSES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const createAddressReducer = (state = { address: {} }, action) => {
    switch (action.type) {
        case CREATE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case CREATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
                address: action.payload.address
            }

        case CREATE_ADDRESS_RESET:
            return {
                ...state,
                loading: false,
                success: false
            }

        case CREATE_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const addressReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ADDRESS_REQUEST:
        case DELETE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ADDRESS_FAILURE:
        case DELETE_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case UPDATE_ADDRESS_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false
            }

        case DELETE_ADDRESS_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const getCountriesReducer = (state = { countries: [] }, action) => {
    switch (action.type) {
        case ALL_COUNTRIES_REQUEST:
            return {
                ...state,
                loading: true,
                countries: []
            }

        case ALL_COUNTRIES_SUCCESS:
            return {
                ...state,
                loading: false,
                countries: action.payload,
            }

        case ALL_COUNTRIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const getStatesReducer = (state = { states: [] }, action) => {
    switch (action.type) {
        case ALL_STATES_REQUEST:
            return {
                ...state,
                loading: true,
                states: []
            }

        case ALL_STATES_SUCCESS:
            return {
                ...state,
                loading: false,
                states: action.payload,
            }

        case ALL_STATES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}