import { SET_ACCORDION } from "../constants/paymentConstants"

const initialState = {
    cvv: '',
    accordionExpanded: 'address'
}

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CVV':
            return {
                ...state,
                cvv: action.payload
            }

        case SET_ACCORDION:
            return {
                ...state,
                accordionExpanded: action.payload
            }

        default:
            return state
    }
}

export default paymentReducer