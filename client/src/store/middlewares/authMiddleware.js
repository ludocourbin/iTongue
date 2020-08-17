import axios from "axios";

import { SIGNUP, signupSuccess, signupError } from "../actions/userActions";

export default (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        // réagir au signup
        case SIGNUP:
            let data = store.getState().user.signupData;
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
        default:
            return;
    }
};
