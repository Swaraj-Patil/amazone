import { SET_SIDEBAR_STATE } from "../constants/adminConstants"

const initialState = {
    sidebarState: 'dashboard',
}

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIDEBAR_STATE:
            return {
                ...state,
                sidebarState: action.payload
            }

        default:
            return state
    }
}