import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAILURE,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE,
    CLEAR_ERRORS,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_RESET,
    CREATE_PRODUCT_FAILURE,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    ALL_REVIEWS_FAILURE,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAILURE,
    DELETE_REVIEW_RESET,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_RESET,
    CREATE_REVIEW_FAILURE
} from '../constants/productConstants'

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                ...state,        // tutorial skipped this line
                loading: true,
                products: []     // tutorial include this line
            }

        case ALL_PRODUCTS_SUCCESS:
            return {
                ...state,        // tutorial skipped this line
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }

        case ALL_PRODUCTS_FAILURE:
            return {
                ...state,        // tutorial skipped this line
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

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,           // tutorial skipped this line
                loading: false,
                product: action.payload
            }

        case PRODUCT_DETAILS_FAILURE:
            return {
                ...state,           // tutorial skipped this line
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

export const createProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }

        case CREATE_PRODUCT_RESET:
            return {
                ...state,
                success: false,
                loading: false
            }

        case CREATE_PRODUCT_FAILURE:
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

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case CREATE_REVIEW_RESET:
            return {
                ...state,
                success: false,
                loading: false
            }

        case CREATE_REVIEW_FAILURE:
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

export const productReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case ALL_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ALL_REVIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload
            }

        case ALL_REVIEWS_FAILURE:
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

export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_REVIEW_RESET:
            return {
                ...state,
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