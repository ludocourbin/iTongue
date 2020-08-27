export const LOGIN_SUBMIT = "LOGIN_SUBMIT";
export const LOGIN_SUBMIT_SUCCESS = "LOGIN_SUBMIT_SUCCESS";
export const LOGIN_SUBMIT_ERROR = "LOGIN_SUBMIT_ERROR";
export const LOGIN_INPUT_VALUE = "LOGIN_INPUT_VALUE";


export const loginSubmit = () => ({
    type: LOGIN_SUBMIT,
});

export const loginSubmitSuccess = (payload) => ({
    type: LOGIN_SUBMIT_SUCCESS,
    payload,
});

export const loginSubmitError = (payload) => ({
    type: LOGIN_SUBMIT_ERROR,
    payload,
});

export const loginInputValue = (payload) => ({
    type: LOGIN_INPUT_VALUE,
    payload,
});

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const logout = () => ({
    type: LOGOUT,
});

export const logoutSucess = (payload) => ({
    type: LOGOUT_SUCCESS,
    payload,
});

export const logoutError = (payload) => ({
    type: LOGOUT_ERROR,
    payload,
});