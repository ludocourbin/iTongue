import { SIGNUP_INPUT_CHANGE, SET_ERROR_MESSAGE } from "../Actions/userActions";

const initialState = {
    signupData: {
        name: "",
        surname: "",
        email: "ludo@gmail.com",
        password: "",
        passwordConfirm: "",
        terms: false,
    },
    errorMessage: "",
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
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
};
