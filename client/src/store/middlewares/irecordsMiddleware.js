import axios from "axios";

import {
    SEND_IRECORDS_RECORDED,
    sendIrecordsSuccess,
    sendIrecordsError,
} from "../actions/irecordsActions";

export default (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case SEND_IRECORDS_RECORDED:
            const blob = action.payload;
            const user = store.getState().user.currentUser;
            const translation = { id: 11 };
            const file = new File([blob], "iRecord");

            const data = new FormData();
            data.append("translation_id", translation.id);
            // data.append("record", blob);
            data.append("record", file);

            axios({
                method: "POST",
                url: `https://itongue.herokuapp.com/users/${user.id}/record`,
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${
                        store.getState().user.accessToken
                    }`,
                },
            })
                .then((res) => {
                    console.log(res);
                    // store.dispatch(sendIrecordsSuccess(res));
                })
                .catch((err) => {
                    console.log(err);
                    // store.dispatch(sendIrecordsError(err));
                });

        default:
            return;
    }
};
