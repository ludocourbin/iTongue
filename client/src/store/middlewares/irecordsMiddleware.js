import axios from "axios";
import { httpClient } from "../../utils";
import {
    SEND_IRECORDS_RECORDED,
    FETCH_ALL_RECORDS,
    sendIrecordSuccessIrecordsPage,
    sendIrecordSuccessUserProfile,
    sendIrecordsError,
    fetchAllRecordsSuccess,
    fetchAllRecordsError,
    FETCH_EXPRESSIONS_USER,
    fetchAllExpressionsSuccess,
    fetchAllExpressionsError,
    DELETE_IRECORD,
    deleteIrecordSuccessIrecordsPage,
    deleteIrecordSuccessUserProfile,
    deleteIrecordError,
} from "../actions/irecordsActions";

export const irecordsMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case SEND_IRECORDS_RECORDED:
            const user = store.getState().user.currentUser;
            let translationId = store.getState().irecords.languageId;
            translationId = translationId.toString();

            fetch(action.payload)
                .then((audio) => audio.blob())
                .then((blob) => {
                    console.log(blob);
                    const file = new File([blob], "record.mp3", {
                        type: blob.type,
                    });

                    const formData = new FormData();
                    formData.append("record", file);
                    formData.append("translation_id", translationId);

                    httpClient
                        .post(
                            {
                                url: `/users/${user.id}/record`,
                                data: formData,
                                headers: { "Content-Type": `multipart/form-data` },
                            },
                            store
                        )
                        .then((res) => {
                            const { record } = res.data.data;
                            record.user = user;
                            store.dispatch(sendIrecordSuccessUserProfile(record));
                            store.dispatch(sendIrecordSuccessIrecordsPage(record));
                        })
                        .catch((err) => {
                            console.log(err);
                            store.dispatch(sendIrecordsError());
                        });
                });

            break;
        case FETCH_ALL_RECORDS: {
            httpClient
                .get(
                    {
                        url: "/records",
                    },
                    store
                )
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
        case FETCH_EXPRESSIONS_USER:
            httpClient
                .get(
                    {
                        url: `/expressions`,
                    },
                    store
                )
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
            break;

        case DELETE_IRECORD:
            const { id } = store.getState().user.currentUser;

            httpClient
                .delete(
                    {
                        url: `/users/${id}/record/${action.payload}`,
                    },
                    store
                )
                .then(() => {
                    /* update state of the records of the user slug infos */
                    const recordsUserProfile = store.getState().user.userSlugInfos
                        .records;
                    const recordsUserProfileUpdatedPostDelete = recordsUserProfile.filter(
                        (record) => record.id !== action.payload
                    );

                    store.dispatch(
                        deleteIrecordSuccessUserProfile(
                            recordsUserProfileUpdatedPostDelete
                        )
                    );

                    /* Update state of all iRecords */

                    const recordIrecordsPage = store.getState().irecords.allRecordsList;
                    const recordsIrecordsPageUpdatedPostDelete = recordIrecordsPage.filter(
                        (record) => record.id !== action.payload
                    );

                    store.dispatch(
                        deleteIrecordSuccessIrecordsPage(
                            recordsIrecordsPageUpdatedPostDelete
                        )
                    );
                })
                .catch(() => {
                    store.dispatch(deleteIrecordError());
                });
            break;
        default:
            return;
    }
};
