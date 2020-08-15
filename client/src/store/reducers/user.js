import { SIGNUP_INPUT_CHANGE } from "../Actions/userActions";

const initialState = {
    signupData: {
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordConfirm: "",
        terms: "",
    },
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
        default:
            return state;
    }
};
