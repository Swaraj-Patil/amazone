import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const newItem = action.payload
            const itemExists = state.cartItems.find(cartItem => cartItem.product === newItem.product)

            if (itemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(cartItem => cartItem.product === itemExists.product ? newItem : cartItem)
                }

            } else {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems,
                        newItem
                    ]
                }
            }

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.product !== action.payload)
            }

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }

        default:
            return state
    }
}