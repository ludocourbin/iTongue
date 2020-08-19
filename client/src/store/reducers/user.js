import {
    SIGNUP_INPUT_CHANGE,
    SET_ERROR_MESSAGE_PASSWORD,
    SET_ERROR_MESSAGE_MAIL,
    SHOW_PASSWORD,
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGOUT,
} from "../actions/userActions";

import {
    LOGIN_INPUT_CHANGE,
    LOGIN_SUBMIT_SUCCESS,
    LOGIN_SUBMIT_ERROR,
    LOGIN,
} from "../actions/loginActions.js";

const initialState = {
    currentUser: "",
    isLogged: false,
    loading: false,
    token: null,
    signupData: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm: "",
    },
    loginData: {
        email: "",
        password: "",
        stayConnected: true,
    },
    showPassword: false,
    errorMessagePassword: "",
    errorMessageEmail: "",
    errorMailUsed: "",
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SIGNUP_INPUT_CHANGE:
            return {
                ...state,
                signupData: {
                    ...state.signupData,
                    ...action.payload,
                },
                errorMailUsed: "",
            };
        case SET_ERROR_MESSAGE_PASSWORD:
            return {
                ...state,
                errorMessagePassword: action.payload,
            };
        case SET_ERROR_MESSAGE_MAIL:
            return {
                ...state,
                errorMessageEmail: action.payload,
            };
        case SHOW_PASSWORD:
            return {
                ...state,
                showPassword: !state.showPassword,
            };
        case SIGNUP:
            return {
                ...state,
                loading: true,
                currentUser: "",
                errorMailUsed: "",
                errorMessageEmail: "",
                isLogged: false,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                isLogged: true,
                signupData: {
                    firstname: "",
                    lastname: "",
                    email: "",
                    password: "",
                    confirm: "",
                },
                errorMailUsed: "",
                errorMessageEmail: "",
                currentUser: { ...action.payload },
                token: action.payload.token,
            };
        case SIGNUP_ERROR:
            return {
                ...state,
                isLogged: false,
                loading: false,
                signupData: {
                    firstname: state.signupData.firstname,
                    lastname: state.signupData.lastname,
                    email: state.signupData.email,
                    password: "",
                    confirm: "",
                },
                currentUser: "",
                errorMessageEmail: "",
                errorMailUsed: action.payload,
            };

        case LOGIN:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUBMIT_SUCCESS:
            return {
                ...state,
                loading: false,
                loginErrorMessage: "",
                currentUser: { ...action.payload },
                token: action.payload.token,
                loginData: {
                    email: "",
                    password: "",
                    stayConnected: true,
                },
            };
        case LOGIN_SUBMIT_ERROR:
            return {
                ...state,
                loading: false,
                loginErrorMessage: action.payload,
                currentUser: "",
                token: "",
                loginData: {
                    email: state.loginData.email,
                    password: "",
                    stayConnected: true,
                },
            };
        case LOGIN_INPUT_CHANGE:
            return {
                ...state,
                loginData: {
                    ...state.loginData,
                    ...action.payload,
                },
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                loginData: {
                    email: state.currentUser.email,
                    password: "",
                    stayConnected: true,
                },
                currentUser: "",
                loggedMessage: "",
                isLogged: false,
                errorMailUsed: "",
                errorMessageEmail: "",
            };
        default:
            return state;
    }
};
