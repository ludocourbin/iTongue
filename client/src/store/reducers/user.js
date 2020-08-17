import {
    SIGNUP_INPUT_CHANGE,
    SET_ERROR_MESSAGE_PASSWORD,
    SET_ERROR_MESSAGE_MAIL,
    SHOW_PASSWORD,
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR
} from "../actions/userActions";

const initialState = {
    currentUser: { slug: "ludocourbin" },
    isLogged: false,
    loading: false,
    signupData: {
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordConfirm: "",
        terms: false
    },
    showPassword: false,
    errorMessagePassword: "",
    errorMessageEmail: ""
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SIGNUP_INPUT_CHANGE:
            return {
                ...state,
                signupData: {
                    ...state.signupData,
                    ...action.payload
                }
            };
        case SET_ERROR_MESSAGE_PASSWORD:
            return {
                ...state,
                errorMessagePassword: action.payload
            };
        case SET_ERROR_MESSAGE_MAIL:
            return {
                ...state,
                errorMessageEmail: action.payload
            };
        case SHOW_PASSWORD:
            return {
                ...state,
                showPassword: !state.showPassword
            };
        case SIGNUP:
            return {
                ...state,
                loading: true
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                isLogged: true,
                signupData: {
                    name: "",
                    surname: "",
                    email: "",
                    password: "",
                    passwordConfirm: "",
                    terms: false
                },
                currentUser: action.payload,
                loggedMessage: `Bienvenue ${action.payload.username}`
            };

        case SIGNUP_ERROR:
            return {
                ...state,
                isLogged: true,
                loading: true,
                signupData: {
                    name: "",
                    surname: "",
                    email: "",
                    password: "",
                    passwordConfirm: "",
                    terms: false
                },
                currentUser: action.payload,
                loggedMessage: `Bienvenue ${action.payload.username}`
            };
        default:
            return state;
    }
};
