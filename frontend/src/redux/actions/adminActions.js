import { SET_SIDEBAR_STATE } from "../constants/adminConstants";

export const setSidebarState = newState => ({
    type: SET_SIDEBAR_STATE,
    payload: newState
})