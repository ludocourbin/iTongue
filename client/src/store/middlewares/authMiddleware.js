import axios from "axios";
import { toast } from "react-toastify";

import { SIGNUP, signupSuccess, signupError } from "../actions/userActions";
import { LOGIN, loginSubmitSuccess, loginSubmitError } from "../actions/loginActions";

export default (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        // réagir au signup
        case SIGNUP:
            const data = store.getState().user.signupData;
            axios({
                method: "post",
                url: "https://itongue.herokuapp.com/users",
                data,
            })
                .then((res) => {
                    console.log(res.data.data.id);
                    const data = {
                        email: store.getState().user.signupData.email,
                        password: store.getState().user.signupData.password,
                    };
                    if (res.data.data.id) {
                        console.log(data);
                        axios({
                            method: "post",
                            url: "https://itongue.herokuapp.com/users/login",
                            data,
                        })
                            .then((res) => {
                                console.log(res);
                                store.dispatch(
                                    signupSuccess({ token: res.accessToken })
                                );
                                toast.success("bienvenue ");
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data.errors[0].msg);
                        store.dispatch(
                            signupError(error.response.data.errors[0].msg)
                        );
                    }
                });

            return;
        case LOGIN:
            const dataLogin = store.getState().login.loginData;
            console.log(dataLogin);
            axios({
                method: "post",
                url: "https://itongue.herokuapp.com/users/login",
                data: dataLogin,
            })
                .then((res) => {
                    console.log("axios ok");
                    toast.info("Connexion en cours..");
                    store.dispatch(loginSubmitSuccess(res.data));
                })
                .catch((err) => {
                    console.log("error : " + err);
                    toast.warning("Sorry");
                    store.dispatch(
                        loginSubmitError("Désolé cet utilisateur n'existe pas")
                    );
                });
        default:
            return;
    }
};
