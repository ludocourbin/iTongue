import axios from "axios";
import {
    SEND_IRECORDS_RECORDED,
    FETCH_ALL_RECORDS,
    sendIrecordsSuccess,
    sendIrecordsError,
    fetchAllRecordsSuccess,
    fetchAllRecordsError
} from "../actions/irecordsActions";

export const irecordsMiddleware = store => next => action => {
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
                    Authorization: `Bearer ${store.getState().user.accessToken}`
                }
            })
                .then(res => {
                    console.log(res);
                    // store.dispatch(sendIrecordsSuccess(res));
                })
                .catch(err => {
                    console.log(err);
                    // store.dispatch(sendIrecordsError(err));
                });
        case FETCH_ALL_RECORDS: {
            axios({
                method: "GET",
                url: "https://itongue.herokuapp.com/records"
            })
                .then(res => {
                    const records = res.data.data;
                    const recordsWithType = records.map(record => {
                        return {
                            ...record,
                            type: "audio"
                        };
                    });
                    store.dispatch(fetchAllRecordsSuccess(recordsWithType));
                })
                .catch(err => {
                    store.dispatch(
                        fetchAllRecordsError(
                            "Un problème est survenue lors du chargement de la liste des iRecords"
                        )
                    );
                    console.error(err);
                });
            break;
        }
        default:
            return;
    }
};
