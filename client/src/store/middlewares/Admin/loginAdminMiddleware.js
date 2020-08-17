import { LOGIN_SUBMIT, loginSubmitSuccess, loginSubmitError } from "../../actions/Admin/loginAdminActions";
import axios from 'axios';

export const loginAdminMiddleware = (store) => (next) => (action) => {

    next(action);
    switch (action.type) {
        case LOGIN_SUBMIT: {

            const loginData = store.getState().loginAdminReducer.loginData;
            console.log(loginData);
        /*
            axios({
                method: 'POST',
                url='',
                data={},
            })
            .then(response => {
                console.log(response);
                store.dispatch(loginSubmitSuccess());
            })
            .error(error => {
                console.error(error);
                store.dispatch(loginSubmitError());
            })
        */
            break;
        };
        default: {
            break;
        };
    };
};