import axios from "axios";
import {
    SEND_IRECORDS_RECORDED,
    FETCH_ALL_RECORDS,
    sendIrecordsSuccess,
    sendIrecordsError,
    fetchAllRecordsSuccess,
    fetchAllRecordsError,
    FETCH_EXPRESSIONS,
    fetchAllExpressionsSuccess,
    fetchAllExpressionsError,
} from "../actions/irecordsActions";

export const irecordsMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case SEND_IRECORDS_RECORDED:
            const user = store.getState().user.currentUser;
            let translationId = store.getState().irecords.languageId;
            translationId = translationId.toString();

            const blob = action.payload.blob;

            const file = new File([blob], "record.mp3", {
                type: blob.type,
            });
            const formData = new FormData();
            formData.append("record", file);
            formData.append("translation_id", translationId);

            console.log(translationId);

            axios({
                method: "POST",
                url: `https://itongue.herokuapp.com/users/${user.id}/record`,
                data: formData,
                headers: {
                    "Content-Type": `multipart/form-data`,
                    Authorization: `Bearer ${
                        store.getState().user.accessToken
                    }`,
                },
            })
                .then((res) => {
                    console.log(res);
                    store.dispatch(sendIrecordsSuccess());
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(sendIrecordsError());
                });
        case FETCH_ALL_RECORDS: {
            axios({
                method: "GET",
                url: "https://itongue.herokuapp.com/records",
            })
                .then((res) => {
                    const records = res.data.data;
                    const recordsWithType = records.map((record) => {
                        return {
                            ...record,
                            type: "audio",
                        };
                    });
                    store.dispatch(fetchAllRecordsSuccess(recordsWithType));
                })
                .catch((err) => {
                    store.dispatch(
                        fetchAllRecordsError(
                            "Un problème est survenue lors du chargement de la liste des iRecords"
                        )
                    );
                    console.error(err);
                });
            break;
        }
        case FETCH_EXPRESSIONS:
            axios({
                method: "GET",
                url: "https://itongue.herokuapp.com/expressions",
            })
                .then((res) => {
                    const expressions = res.data.data;
                    store.dispatch(fetchAllExpressionsSuccess(expressions));
                })
                .catch((err) => {
                    store.dispatch(
                        fetchAllExpressionsError(
                            "Un problème est survenue lors du chargement de la liste des expressions"
                        )
                    );
                    console.error(err);
                });
        default:
            return;
    }
};
