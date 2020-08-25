import { LOGIN_SUBMIT, loginSubmitSuccess, loginSubmitError, LOGOUT } from "../../actions/Admin/loginAdminActions";
import axios from 'axios';

export const loginAdminMiddleware = (store) => (next) => (action) => {

    next(action);
    switch (action.type) {
        case LOGIN_SUBMIT: 
            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API_URL}/users/login`,
                data: { ...store.getState().loginAdminReducer.loginData },
            })
            .then((res) => {

                const data = res.data.data;

                if ( !data.user.isAdmin ) {
                    store.dispatch(loginSubmitError("Vous n'êtes pas administrateur"));
                    return;
                }

                store.dispatch(loginSubmitSuccess({
                    accessToken: data.accessToken,
                    user: data.user,
                }));
            })
            .catch((err) => {
                console.error(err);
                store.dispatch(loginSubmitError("Connexion refusée"));
            });
            break;
        case LOGOUT : 
            break;
        default:
            break;
    };
};