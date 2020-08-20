import {
    SET_IRECORD_SELECTED_ID,
    SELECTED_IRECORDS_TO_RECORD,
    TOGGLE_RECORDING,
    SEND_IRECORDS_RECORDED,
    SEND_IRECORDS_SUCCESS,
    SEND_IRECORDS_ERROR,
} from "../actions/irecordsActions";

const initialState = {
    irecordSelectedId: null,
    isRecording: false,
    recording: null,
    loading: false,
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
        case SEND_IRECORDS_RECORDED:
            return {
                ...state,
                loading: true,
            };
        case SEND_IRECORDS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case SEND_IRECORDS_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
