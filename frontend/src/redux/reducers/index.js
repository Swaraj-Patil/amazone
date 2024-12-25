import { combineReducers } from "redux";
import {
    createProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productReviewsReducer,
    productsReducer,
    reviewReducer
} from "./productReducers";
import { forgotPasswordReducer, profileReducer, userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
import { register } from 'swiper/element/bundle'
import {
    addressReducer,
    createAddressReducer,
    getAddressesReducer,
    getCountriesReducer,
    getStatesReducer
} from "./addressReducer";
import paymentReducer from "./paymentReducer";
import { myOrdersReducer, orderReducer } from "./orderReducer";
import { adminReducer } from "./adminReducer";
register()

const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    createProduct: createProductReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    createReview: newReviewReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
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