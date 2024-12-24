import { combineReducers } from "redux";
import { productDetailsReducer, productsReducer } from "./productReducers";
import { forgotPasswordReducer, profileReducer, userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
// import { toastsReducer as toasts } from 'react-toastify-redux'

import { register } from 'swiper/element/bundle'
import { addressReducer, createAddressReducer, getAddressesReducer, getCountriesReducer, getStatesReducer } from "./addressReducer";
import paymentReducer from "./paymentReducer";
import { myOrdersReducer, orderReducer } from "./orderReducer";
import { adminReducer } from "./adminReducer";
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
    address: addressReducer,
    countries: getCountriesReducer,
    states: getStatesReducer,
    payment: paymentReducer,
    order: orderReducer,
    myOrders: myOrdersReducer,
    admin: adminReducer,
})

export default rootReducer