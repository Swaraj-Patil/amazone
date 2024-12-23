const initialState = {
    cvv: ''
}

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CVV':
            return {
                ...state,
                cvv: action.payload
            }

        default:
            return state
    }
}

export default paymentReducer