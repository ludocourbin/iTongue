export const SET_IRECORD_SELECTED_ID = "SET_IRECORD_SELECTED_ID";
export const TOGGLE_RECORDING = "TOGGLE_RECORDING";
export const SELECTED_IRECORDS_TO_RECORD = "SELECTED_IRECORDS_TO_RECORD";

export const setIrecordSelectedId = (payload) => ({
    type: SET_IRECORD_SELECTED_ID,
    payload,
});
export const toggleRecording = (payload) => ({
    type: TOGGLE_RECORDING,
    payload,
});
export const selectIrecordToRecord = (payload) => ({
    type: SELECTED_IRECORDS_TO_RECORD,
    payload,
});

/* Fetch all records for iRecordsPage */

export const FETCH_ALL_RECORDS = "FETCH_ALL_RECORDS";
export const FETCH_ALL_RECORDS_SUCCESS = "FETCH_ALL_RECORDS_SUCCESS";
export const FETCH_ALL_RECORDS_ERROR = "FETCH_ALL_RECORDS_ERROR";

export const fetchAllRecords = () => ({
    type: FETCH_ALL_RECORDS
});

export const fetchAllRecordsSuccess = (payload) => ({
    type: FETCH_ALL_RECORDS_SUCCESS,
    payload,
});

export const fetchAllRecordsError = (payload) => ({
    type: FETCH_ALL_RECORDS_ERROR,
    payload,
});