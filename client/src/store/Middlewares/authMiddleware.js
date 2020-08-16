import axios from "axios";

import { SIGNUP, signupSuccess } from "../Actions/userActions";

export default (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        // réagir au signup
        case SIGNUP:
            const data = store.getState().user.signupData;
            console.log(data);
            setTimeout(() => {
                store.dispatch(signupSuccess({ username: "ludo" }));
            }, 1000);

            axios({
                method: "post",
                // url: '/users',
                data,
            })
                .then((res) => {
                    // store.dispatch(signupSuccess({ username: "ludo" }));
                })
                .catch((err) => {
                    // store.dispatch(signupError("Impossible de créer un compte"));
                });

            break;
        default:
            return;
    }
};
