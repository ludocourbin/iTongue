export const SET_RECORDS_BY_SEARCH = "SET_RECORDS_BY_SEARCH";
export const GET_RECORDS_BY_SEARCH = "GET_RECORDS_BY_SEARCH"

export const setRecordsBySearch = (payload) => ({
    type: SET_RECORDS_BY_SEARCH,
    payload,
});

export const getRecordsBySearch = () => ({
    type: GET_RECORDS_BY_SEARCH,
});