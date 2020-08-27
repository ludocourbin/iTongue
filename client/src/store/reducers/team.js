import { TOGGLE_MODAL, CHANGE_ID } from "../actions/modalActions";

const initialState = {
    visible: false,
    myAvatar:{
        name:"",
    }
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
                myAvatar: action.payload
            }
        default:
            return state;
    }
};
