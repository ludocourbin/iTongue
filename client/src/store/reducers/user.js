import {
    SIGNUP_INPUT_CHANGE,
    SET_ERROR_MESSAGE_PASSWORD,
    SET_ERROR_MESSAGE_MAIL,
    SHOW_PASSWORD,
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGOUT,
    FETCH_ALL_USERS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_ERROR,
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
    accessToken: null,
    refreshToken: null,
    signupData: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm: "",
    },
    loginData: {
        email: "gautier.colasse@gmail.com",
        password: "123456",
        stayConnected: true,
    },
    showPassword: false,
    errorMessagePassword: "",
    errorMessageEmail: "",
    errorMailUsed: "",

    allUsersList: [],
    isLoadingallUsers: false,
    usersListError: "",
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
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
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
                currentUser: { ...action.payload.user },
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
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
                accessToken: "",
                refreshToken: "",
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
                accessToken: null,
                refreshToken: null,
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
        case FETCH_ALL_USERS: 
            return {
                ...state,
                isLoadingallUsers: true,
            };
        case FETCH_ALL_USERS_SUCCESS: 
            return {
                ...state,
                allUsersList: [...action.payload],
                isLoadingallUsers: false,
            };
        case FETCH_ALL_USERS_ERROR: 
            return {
                ...state,
                isLoadingallUsers: false,
                usersListError: action.payload,
            };
        default:
            return state;
    }
};