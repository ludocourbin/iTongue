export const SIGNUP_INPUT_CHANGE = "SIGNUP_INPUT_CHANGE";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";

export const signupInputChange = (payload) => ({
    type: SIGNUP_INPUT_CHANGE,
    payload,
});

export const setErrorMessage = (payload) => ({
    type: SET_ERROR_MESSAGE,
    payload,
});
