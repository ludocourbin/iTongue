import axios from "axios";

import { SIGNUP, signupSuccess, signupError } from "../actions/userActions";

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
                    console.log(`response request success: ${res}`);
                    if (res) {
                        console.log(res);
                        store.dispatch(signupSuccess({ username: "ludo" }));
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
