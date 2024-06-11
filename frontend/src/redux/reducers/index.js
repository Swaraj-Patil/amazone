import { combineReducers } from "redux";
import { productDetailsReducer, productsReducer } from "./productReducers";
import { forgotPasswordReducer, profileReducer, userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
// import { toastsReducer as toasts } from 'react-toastify-redux'

import { register } from 'swiper/element/bundle'
import { addressReducer, createAddressReducer, getAddressesReducer } from "./addressReducer";
register()

const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    createAddress: createAddressReducer,
    allAddresses: getAddressesReducer,
    address: addressReducer
})

export default rootReducer