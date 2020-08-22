import {
    SET_IRECORD_SELECTED_ID,
    SELECTED_IRECORDS_TO_RECORD,
    TOGGLE_RECORDING,
    SEND_IRECORDS_RECORDED,
    SEND_IRECORDS_SUCCESS,
    SEND_IRECORDS_ERROR,
    FETCH_ALL_RECORDS,
    FETCH_ALL_RECORDS_SUCCESS,
    FETCH_ALL_RECORDS_ERROR,
    SET_TRANSLATION_ID,
    FETCH_EXPRESSIONS,
    FETCH_EXPRESSIONS_ERROR,
    FETCH_EXPRESSIONS_SUCCESS,
} from "../actions/irecordsActions";

const initialState = {
    irecordSelectedId: null,
    isRecording: false,
    recording: null,
    loading: false,
    allRecordsList: [],
    isLoadingAllRecords: false,
    recordsListError: "",
    languageId: null,
    allExpressions: [],
    isLoadingExpressions: false,
    errorFetchingExpressions: null,
};
export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_IRECORD_SELECTED_ID:
            return {
                ...state,
                irecordSelectedId: action.payload,
            };
        case SET_TRANSLATION_ID:
            return {
                ...state,
                languageId: action.payload,
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
        case FETCH_ALL_RECORDS:
            return {
                ...state,
                isLoadingAllRecords: true,
            };
        case FETCH_ALL_RECORDS_SUCCESS:
            return {
                ...state,
                allRecordsList: [...action.payload],
                isLoadingAllRecords: false,
                recordsListError: "",
            };
        case FETCH_ALL_RECORDS_ERROR:
            return {
                ...state,
                isLoadingAllRecords: false,
                recordsListError: action.payload,
            };
        case FETCH_EXPRESSIONS:
            return {
                ...state,
                errorFetchingExpressions: null,
                allExpressions: [],
                isLoadingExpressions: true,
            };
        case FETCH_EXPRESSIONS_SUCCESS:
            return {
                ...state,
                isLoadingExpressions: false,
                allExpressions: [...action.payload],
                errorFetchingExpressions: null,
            };
        case FETCH_EXPRESSIONS_ERROR:
            return {
                ...state,
                allExpressions: [],
                errorFetchingExpressions: action.payload,
                isLoadingExpressions: false,
            };
        default:
            return state;
    }
};
