import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAILURE,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAILURE,
    CLEAR_ERRORS,
} from '../constants/productConstants'
import axios from 'axios'

// Fetch all products
export const getAllProducts = (keyword = '', currentPage = 1, price = [0, 999999], category, rating = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST })

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`

        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAILURE,
            payload: error.response.data.message
        })
    }
}

// Create a new product --> Admin
export const createNewProduct = productDetails => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/v1/admin/product/new',
            productDetails,
            config,
        )

        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAILURE,
            payload: error.response.data.message
        })
    }
}

// Fetch product details
export const getProductDetails = id => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAILURE,
            payload: error.response.data.message
        })
    }
}

// Create new review
export const createReview = reviewData => async (dispatch) => {
    try {
        dispatch({ type: CREATE_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
            '/api/v1/review',
            reviewData,
            config
        )

        dispatch({
            type: CREATE_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: CREATE_REVIEW_FAILURE,
            payload: error.response.data.message
        })
    }
}

// Clear all errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}