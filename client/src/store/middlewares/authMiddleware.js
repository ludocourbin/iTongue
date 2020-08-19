import axios from "axios";
import { toast } from "react-toastify";

import { SIGNUP, signupSuccess, signupError } from "../actions/userActions";
import { LOGIN, loginSubmitSuccess, loginSubmitError } from "../actions/loginActions";

export default store => next => action => {
    next(action);
    switch (action.type) {
        // réagir au signup
        case SIGNUP:
            const data = store.getState().user.signupData;
            axios({
                method: "post",
                url: "https://itongue.herokuapp.com/users",
                data
            })
                .then(res => {
                    const data = {
                        email: store.getState().user.signupData.email,
                        password: store.getState().user.signupData.password
                    };
                    if (res.data.data.id) {
                        axios({
                            method: "post",
                            url: "https://itongue.herokuapp.com/users/login",
                            data
                        })
                            .then(res => {
                                const currentUser = res.data.data.user;
                                store.dispatch(signupSuccess(currentUser));
                                toast.success(`Bienvenue ${currentUser.firstname}`);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                })
                .catch(error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        // console.log(error.response.data.errors[0].msg);
                        store.dispatch(signupError(error.response.data.errors[0].msg));
                    }
                });

            return;
        case LOGIN:
            const dataLogin = store.getState().user.loginData;
            axios({
                method: "post",
                url: "https://itongue.herokuapp.com/users/login",
                data: dataLogin
            })
                .then(res => {
                    const currentUser = res.data.data.user;
                    store.dispatch(loginSubmitSuccess(currentUser));
                    setTimeout(() => {
                        toast.success(`Bienvenue ${currentUser.firstname}`);
                    }, 1000);
                })
                .catch(err => {
                    toast.warning("Sorry");
                    store.dispatch(loginSubmitError("Désolé cet utilisateur n'existe pas"));
                });
        default:
            return;
    }
};
