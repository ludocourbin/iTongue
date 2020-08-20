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

            const file = new File([blob], "filename");
            console.log(file);
        // const data = new FormData();
        // data.append("translation_id", translation.id);
        // data.append("record", blob);

        // const config = {
        //     header: { "Content-Type": "multipart/form-data" },
        // };

        // axios
        //     .post(
        //         `https://itongue.herokuapp.com/users/${user.id}/record`,
        //         data,
        //         config
        //     )
        //     .then((res) => {
        //         store.dispatch(sendIrecordsSuccess(res));
        //     })
        //     .catch((err) => {
        //         store.dispatch(sendIrecordsError(err));
        //     });

        default:
            return;
    }
};
