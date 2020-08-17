import { 
    LOGIN_SUBMIT, 
    LOGIN_SUBMIT_SUCCESS, 
    LOGIN_SUBMIT_ERROR, 
    LOGIN_INPUT_VALUE 
} from "../../actions/Admin/loginAdminActions";

const initialState = {
    loginData: { 
        email: '',
        password: '' 
    },
    loading: false,
    isLogged: true,
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
            };
        case LOGIN_SUBMIT_ERROR: 
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    };
};