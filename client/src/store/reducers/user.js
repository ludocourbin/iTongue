import {
    SIGNUP_INPUT_CHANGE,
    SET_ERROR_MESSAGE_PASSWORD,
    SET_ERROR_MESSAGE_MAIL,
    SHOW_PASSWORD,
    SIGNUP_SUCCESS,
    // SIGNUP_ERROR,
} from "../Actions/userActions";

const initialState = {
    user: {},
    isLogged: false,
    loading: false,
    signupData: {
        name: "ludovic",
        surname: "courbin",
        email: "ludovic.courbin@gmail.com",
        password: "ludovic",
        passwordConfirm: "ludovic",
        terms: true,
    },
    showPassword: false,
    errorMessagePassword: "",
    errorMessageEmail: "",
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
        case SIGNUP_SUCCESS:
            console.log("hello");
            return {
                ...state,
                isLogged: true,
                signupData: state.signupData.clear(),
                user: action.payload,
                loggedMessage: `Bienvenue ${action.payload.username}`,
            };
        default:
            return state;
    }
};
