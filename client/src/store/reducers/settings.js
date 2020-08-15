import { TOGGLE_MENU } from "../Actions/settingsActions";

const initialState = {
    // loading: false,
    visible: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                ...state,
                visible: !state.visible,
            };
        default:
            return state;
    }
};
