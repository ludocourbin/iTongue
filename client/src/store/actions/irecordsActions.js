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
