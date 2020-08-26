/* Expressionsiddleware */

/* Libs */
import axios from "axios";

/* Actions */
import {
    FETCH_STATS,
    fetchStatsSuccess,
    fetchStatsError,
} from "../../actions/Admin/statisticsActions";

export const statsMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_STATS: {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/admin`,
                headers: {
                    "Authorization": `Bearer ${store.getState().loginAdminReducer.accessToken}`,
                },
            })
            .then(res => {
                store.dispatch(fetchStatsSuccess(res.data.data[0]));
                console.log(res);
            })
            .catch(err => {
                store.dispatch(fetchStatsError(/* TODO */));
                console.error(err);
            });
            break;
        }
        default:
            break;
    };
};