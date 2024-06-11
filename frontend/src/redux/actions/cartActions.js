import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO
} from '../constants/cartConstants'
import axios from 'axios'

export const addItemsToCart = (product, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/product/${product}`)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = productId => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: productId
    })

    localStorage.setItem('cartItems', JSON.stringify(getState())?.cart?.cartItems)
}

export const saveShippingInfo = payload => dispatch => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload
    })

    localStorage.setItem('shippingInfo', JSON.stringify(payload))
}