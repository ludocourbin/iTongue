import {
    FETCH_FAVORIS,
    fetchFavorisSuccess,
    fetchFavorisError,
    FETCH_LIKES,
    fetchLikesSuccess,
    fetchLikesError,
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
        case FETCH_LIKES:
            httpClient
                .get(
                    {
                        url: `/users/${store.getState().user.currentUser.id}/likes`,
                    },
                    store
                )
                .then((res) => {
                    store.dispatch(fetchLikesSuccess(res.data.data));
                })
                .catch((_) => {
                    console.log("error");
                    store.dispatch(fetchLikesError());
                });
            break;
        case ADD_FAVORIS:
            const idRecordToAddFavoris = action.payload;
            httpClient
                .post(
                    {
                        url: `/records/${idRecordToAddFavoris}/bookmark`,
                    },
                    store
                )
                .then((res) => {
                    store.dispatch(addFavorisSuccess());
                })
                .catch((_) => {
                    console.log("error");
                    store.dispatch(addFavorisError());
                });

            break;
        case UNFAVORIS:
            const idRecordToRemoveFavoris = action.payload;
            httpClient
                .delete(
                    {
                        url: `/records/${idRecordToRemoveFavoris}/bookmark`,
                    },
                    store
                )
                .then((res) => {
                    store.dispatch(unFavorisSuccess());
                })
                .catch((_) => {
                    console.log("error");
                    store.dispatch(unFavorisError());
                });
            break;
        case ADD_LIKES:
            const idRecordToAddLike = action.payload;
            httpClient
                .post(
                    {
                        url: `/records/${idRecordToAddLike}/like`,
                    },
                    store
                )
                .then((res) => {
                    store.dispatch(addLikesSuccess());
                })
                .catch((_) => {
                    console.log("error");
                    store.dispatch(addLikesError());
                });
            break;
        case UNLIKES:
            const idRecordToRemoveLike = action.payload;
            httpClient
                .delete(
                    {
                        url: `/records/${idRecordToRemoveLike}/like`,
                    },
                    store
                )
                .then((res) => {
                    store.dispatch(unlikesSuccess());
                })
                .catch((_) => {
                    console.log("error");
                    store.dispatch(unlikesError());
                });
            break;
        default:
            break;
    }
};
