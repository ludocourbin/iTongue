export const SET_IRECORD_SELECTED_ID = "SET_IRECORD_SELECTED_ID";
export const TOGGLE_RECORDING = "TOGGLE_RECORDING";
export const SELECTED_IRECORDS_TO_RECORD = "SELECTED_IRECORDS_TO_RECORD";
export const SEND_IRECORDS_RECORDED = "SEND_IRECORDS_RECORDED";
export const SEND_IRECORDS_SUCCESS = "SEND_IRECORDS_SUCCESS";
export const SEND_IRECORDS_ERROR = "SEND_IRECORDS_ERROR";

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

export const sendIrecordsRecorded = (payload) => ({
    type: SEND_IRECORDS_RECORDED,
    payload,
});
export const sendIrecordsSuccess = (payload) => ({
    type: SEND_IRECORDS_SUCCESS,
    payload,
});
export const sendIrecordsError = (payload) => ({
    type: SEND_IRECORDS_ERROR,
    payload,
});
