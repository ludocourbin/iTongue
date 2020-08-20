import { FETCH_ALL_RECORDS, fetchAllRecordsSuccess, fetchAllRecordsError } from "../actions/irecordsActions";
import axios from 'axios';

export const irecordsMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_ALL_RECORDS: {
            axios({
                method: 'GET',
                url: 'https://itongue.herokuapp.com/records',
            })
            .then(res => {
                const records = res.data.data; 
                const recordsWithType = records.map(record => {
                    return {
                        ...record,
                        type: 'audio',
                    };
                });
                store.dispatch(fetchAllRecordsSuccess(recordsWithType));
            })
            .catch(err => {
                store.dispatch(fetchAllRecordsError("Un problème est survenue lors du chargement de la liste des iRecords"));
                console.error(err);
            })
            break;
        };
        default:
            break;
    };
};