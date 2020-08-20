import {
    SET_IRECORD_SELECTED_ID,
    SELECTED_IRECORDS_TO_RECORD,
    TOGGLE_RECORDING,
} from "../actions/irecordsActions";

const initialState = {
    irecordSelectedId: null,
    isRecording: false,
    recording: null,
};
export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_IRECORD_SELECTED_ID:
            return {
                ...state,
                irecordSelectedId: action.payload,
            };
        case TOGGLE_RECORDING:
            return {
                ...state,
                isRecording: action.payload,
            };
        case SELECTED_IRECORDS_TO_RECORD:
            return {
                ...state,
                recording: action.payload,
            };
        default:
            return state;
    }
};
