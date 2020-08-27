import {
    LOGIN_SUBMIT,
    LOGIN_SUBMIT_SUCCESS,
    LOGIN_SUBMIT_ERROR,
    LOGIN_INPUT_VALUE,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
} from "../../actions/Admin/loginAdminActions";

const initialState = {
    loginData: {
        email: "gautier.colasse@gmail.com",
        password: "",
    },
    loading: false,
    isLogged: true,
    message: "",
    userConnect: {},
    accessToken: "",
    refreshToken: "",
    accessTokenExp: null,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN_INPUT_VALUE:
            return {
                ...state,
                loginData: {
                    ...state.loginData,
                    ...action.payload,
                },
                message:"",
            };
        case LOGIN_SUBMIT:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUBMIT_SUCCESS:
            return {
                ...state,
                loading: false,
                isLogged: true,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                userConnect: action.payload.user,
                message:"",
            };
        case LOGIN_SUBMIT_ERROR:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isLogged: false,
                currentUser: {},
            };
        case LOGOUT_SUCCESS:
        return {
            ...state,
            isLogged: false,
            accessToken: null,
            refreshToken: null,
            userConnect: {},
            accessTokenExp: null,
        };
        case LOGOUT_ERROR:
            return {
                ...state,
            };
        default:
            return state;
    }
};
