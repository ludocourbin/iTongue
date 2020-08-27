import { TOGGLE_MODAL, CHANGE_ID } from "../actions/modalActions";

const initialState = {
    visible: false,
    idAvatar:"",
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            return {
                ...state,
                visible: !state.visible
            };
        case CHANGE_ID:
            return {
                ...state,
                idAvatar: action.payload
            }
        default:
            return state;
    }
};
