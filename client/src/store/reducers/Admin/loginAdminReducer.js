import {
    LOGIN_SUBMIT,
    LOGIN_SUBMIT_SUCCESS,
    LOGIN_SUBMIT_ERROR,
    LOGIN_INPUT_VALUE,
    LOGOUT,
} from "../../actions/Admin/loginAdminActions";

const initialState = {
    loginData: {
        email: "gautier.colasse@gmail.com",
        password: "123456789",
        //email: 'user@user.com',
        //password: '123456',
    },
    loading: false,
    isLogged: false,
    message: "",
    userConnect: {},
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
                userConnect: action.payload.user,
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
        default:
            return state;
    }
};
