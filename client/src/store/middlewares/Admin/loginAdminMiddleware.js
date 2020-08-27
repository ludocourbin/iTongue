import { 
    LOGIN_SUBMIT, 
    loginSubmitSuccess, 
    loginSubmitError, 
    LOGOUT, 
    logoutSucess, 
    logoutError 
} from "../../actions/Admin/loginAdminActions";

import { httpClient } from "../../../utils";

export const loginAdminMiddleware = (store) => (next) => (action) => {

    next(action);
    switch (action.type) {
        case LOGIN_SUBMIT: 

            httpClient.post({
                url: `/users/login`,
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
                    refreshToken: data.refreshToken,
                    user: data.user,
                }));
            })
            .catch((err) => {
                console.error(err);
                store.dispatch(loginSubmitError("Connexion refusée"));
            });
            break;
        case LOGOUT : 
            httpClient.post({
                        url: "/users/logout",
                    }, store)
                .then((res) => {
                    console.log(res);
                    store.dispatch(logoutSucess());
                })
                .catch((err) => {
                    console.error(err);
                    store.dispatch(logoutError());
                })
                .finally((res) => {
                    store.dispatch(logoutSucess());
                });
                break;
        default:
            break;
    };
};