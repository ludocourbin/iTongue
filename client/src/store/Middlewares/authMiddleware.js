import axios from "axios";

import { SIGNUP, signupSuccess, signupError } from "../Actions/userActions";

export default (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        // réagir au signup
        case SIGNUP:
            const data = store.getState().user.signupData;
            console.log(data);
            store.dispatch(signupSuccess({ username: "ludo" }));
            axios({
                method: "post",
                // url: '/users',
                data,
            })
                .then((res) => {})
                .catch((err) => {
                    signupError(err);
                });

            break;
        default:
            return;
    }
};
