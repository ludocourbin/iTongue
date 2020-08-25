import axios from 'axios';

import { 
    FETCH_ALL_LANGUAGES, 
    fetchAllLanguagesSuccess, 
    fetchAllLanguagesError 
} from '../actions/languagesAction';

import { 
    /*
    DELETE_LANGUAGE,
    deleteLanguageSubmitSuccess,
    deleteLanguageSubmitError,
    */
} from '../actions/Admin/expressionsActions';

export const languagesMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_ALL_LANGUAGES: 
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/languages`,
                headers: {
                    "Authorization": `Bearer ${store.getState().user.accessToken}`
                }
            })
            .then(res => {
                const allLanguagesList = res.data.data;
                store.dispatch(fetchAllLanguagesSuccess(allLanguagesList));
            })
            .catch(err => {
                console.error(err);
                store.dispatch(fetchAllLanguagesError(/* Todo */));
            });
            break;
            /*
        case DELETE_LANGUAGE: 
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/languages`,
                headers: {
                    "Authorization": `Bearer ${store.getState().user.accessToken}`
                }
            })
            .then(res => {
                const allLanguagesList = res.data.data;
                store.dispatch(fetchAllLanguagesSuccess(allLanguagesList));
            })
            .catch(err => {
                console.error(err);
                store.dispatch(fetchAllLanguagesError());
            });
            break;
            */
        default:
            break;
    };
};