export const SIGNUP_INPUT_CHANGE = "SIGNUP_INPUT_CHANGE";
export const SET_ERROR_MESSAGE_PASSWORD = "SET_ERROR_MESSAGE_PASSWORD";
export const SET_ERROR_MESSAGE_MAIL = "SET_ERROR_MESSAGE_MAIL";
export const SHOW_PASSWORD = "SHOW_PASSWORD";
export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const LOGOUT = "LOGOUT";

export const signupInputChange = (payload) => ({
    type: SIGNUP_INPUT_CHANGE,
    payload,
});

export const setErrorMessagePassword = (payload) => ({
    type: SET_ERROR_MESSAGE_PASSWORD,
    payload,
});
export const setErrorMessageEmail = (payload) => ({
    type: SET_ERROR_MESSAGE_MAIL,
    payload,
});

export const togglePassword = () => ({
    type: SHOW_PASSWORD,
});

export const signup = () => ({
    type: SIGNUP,
});

export const signupSuccess = (payload) => ({
    type: SIGNUP_SUCCESS,
    payload,
});

export const signupError = (payload) => ({
    type: SIGNUP_ERROR,
    payload,
});
export const logout = () => ({
    type: LOGOUT,
});

export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const FETCH_ALL_USERS_SUCCESS = "FETCH_ALL_USERS_SUCCESS";
export const FETCH_ALL_USERS_ERROR = "FETCH_ALL_USERS_ERROR";

export const fetchAllUsers = () => ({
    type: FETCH_ALL_USERS,
});

export const fetchAllUsersSuccess = (payload) => ({
    type: FETCH_ALL_USERS_SUCCESS,
    payload,
});

export const fetchAllUsersError = (payload) => ({
    type: FETCH_ALL_USERS_ERROR,
    payload,
});