import {
    FETCH_FAVORIS,
    fetchFavorisSuccess,
    fetchFavorisError,
    ADD_FAVORIS,
    addFavorisSuccess,
    addFavorisError,
    UNFAVORIS,
    unFavorisSuccess,
    unFavorisError,
    ADD_LIKES,
    addLikesSuccess,
    addLikesError,
    UNLIKES,
    unlikesSuccess,
    unlikesError,
} from "../actions/likeAndFavorisActions";

import { httpClient } from "../../utils";

export default (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_FAVORIS:
            httpClient
                .get(
                    {
                        url: `/users/${store.getState().user.currentUser.id}/bookmarks`,
                    },
                    store
                )
                .then((res) => {
                    store.dispatch(fetchFavorisSuccess(res.data.data));
                })
                .catch((_) => {
                    console.log("error");
                    store.dispatch(fetchFavorisError());
                });
            break;
        default:
            break;
    }
};
