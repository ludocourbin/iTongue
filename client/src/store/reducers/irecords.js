import { SET_IRECORD_SELECTED_ID } from "../actions/irecordsActions";

const initialState = {
    irecordSelectedId: null,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_IRECORD_SELECTED_ID:
            return {
                ...state,
                irecordSelectedId: action.payload,
            };
        default:
            return state;
    }
};
