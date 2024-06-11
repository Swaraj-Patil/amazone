import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAILURE,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE,
    CLEAR_ERRORS
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