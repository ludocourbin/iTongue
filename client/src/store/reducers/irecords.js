import {
    SET_IRECORD_SELECTED_ID,
    SELECTED_IRECORDS_TO_RECORD,
    TOGGLE_RECORDING,
    SEND_IRECORDS_RECORDED,
    SEND_IRECORD_SUCCESS_IRECORDS_PAGE,
    SEND_IRECORDS_ERROR,
    FETCH_ALL_RECORDS,
    FETCH_ALL_RECORDS_SUCCESS,
    FETCH_ALL_RECORDS_ERROR,
    SET_TRANSLATION_ID,
    FETCH_EXPRESSIONS,
    FETCH_EXPRESSIONS_ERROR,
    FETCH_EXPRESSIONS_SUCCESS,
    DELETE_IRECORD,
    DELETE_IRECORD_SUCCESS_IRECORDS_PAGE,
    DELETE_IRECORD_ERROR,
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
    irecordDeletedMessage: "",
    irecordDeletedError: "",
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
        case SEND_IRECORD_SUCCESS_IRECORDS_PAGE:
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
        case DELETE_IRECORD:
            return {
                ...state,
                loading: true,
                irecordDeletedMessage: "",
            };
        case DELETE_IRECORD_SUCCESS_IRECORDS_PAGE:
            return {
                ...state,
                loading: false,
                irecordDeletedMessage: "iRecords supprimer",
                irecordDeletedError: "",
                allRecordsList: [...action.payload],
            };
        case DELETE_IRECORD_ERROR:
            return {
                ...state,
                loading: false,
                irecordDeletedMessage: "",
                irecordDeletedError: "Problème lors de la suppression",
            };
        default:
            return state;
    }
};
