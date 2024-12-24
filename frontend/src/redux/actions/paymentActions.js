import { SET_ACCORDION } from "../constants/paymentConstants"

export const setCVV = cvv => {
    return {
        type: 'SET_CVV',
        payload: cvv
    }
}

export const setAccordion = acc => ({
    type: SET_ACCORDION,
    payload: acc
})