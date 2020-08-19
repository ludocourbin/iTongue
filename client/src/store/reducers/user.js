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

const initialState = {
    currentUser: "",
    isLogged: false,
    loading: false,
    token: null,
    signupData: {
        firstname: "ludovic",
        lastname: "ludovic",
        email: "ludovic.courbin@gmail.com",
        password: "ludovic",
        confirm: "ludovic",
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
                isLogged: false,
                errorMessageEmail: "",
                isLogged: false,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                isLogged: true,
                signupData: {
                    firstname: "ludovic",
                    lastname: "ludovic",
                    email: "ludovic.courbin@coco",
                    password: "ludovic",
                    confirm: "ludovic",
                },
                currentUser: "ludovic",
                errorMailUsed: "",
                token: action.payload,
                loggedMessage: `Bienvenue sur Itongue`,
            };

        case SIGNUP_ERROR:
            return {
                ...state,
                errorMessageEmail: "",
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
                errorMailUsed: action.payload,
                isLogged: false,
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                currentUser: "",
                loggedMessage: "",
                isLogged: false,
            };
        default:
            return state;
    }
};
