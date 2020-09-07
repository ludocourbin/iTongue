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
            let userId;
            if (action.payload) {
                userId = action.payload;
            } else {
                userId = store.getState().user.currentUser.id;
            }
            httpClient
                .get(
                    {
                        url: `/users/${userId}/bookmarks`,
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
            let currentUserId;
            if (action.payload) {
                currentUserId = action.payload;
            } else {
                currentUserId = store.getState().user.currentUser.id;
            }
            httpClient
                .get(
                    {
                        url: `/users/${currentUserId}/likes`,
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
            httpClient
                .post(
                    {
                        url: `/records/${action.payload.id}/bookmark`,
                    },
                    store
                )
                .then(() => {
                    const allFavoris = [
                        ...store.getState().likeAndFavorisReducer.allFavoris,
                    ];
                    store.dispatch(addFavorisSuccess([action.payload, ...allFavoris]));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(addFavorisError());
                });

            break;
        case UNFAVORIS:
            const favId = action.payload;
            httpClient
                .delete(
                    {
                        url: `/records/${favId}/bookmark`,
                    },
                    store
                )
                .then(() => {
                    const allFavoris = [
                        ...store.getState().likeAndFavorisReducer.allFavoris,
                    ];
                    const favIndex = allFavoris.findIndex(
                        (favori) => favori.id === favId
                    );
                    if (favIndex > -1) {
                        allFavoris.splice(favIndex, 1);
                    }
                    store.dispatch(unFavorisSuccess(allFavoris));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(unFavorisError());
                });
            break;
        case ADD_LIKES:
            const record = action.payload;
            httpClient
                .post(
                    {
                        url: `/records/${record.id}/like`,
                    },
                    store
                )
                .then(() => {
                    const allLikes = [...store.getState().likeAndFavorisReducer.allLikes];
                    store.dispatch(addLikesSuccess([record, ...allLikes]));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(addLikesError());
                });
            break;
        case UNLIKES:
            const likeId = action.payload;
            httpClient
                .delete(
                    {
                        url: `/records/${likeId}/like`,
                    },
                    store
                )
                .then(() => {
                    const allLikes = [...store.getState().likeAndFavorisReducer.allLikes];
                    const likeId = action.payload;
                    const likeIndex = allLikes.findIndex((like) => like.id === likeId);
                    if (likeIndex > -1) {
                        allLikes.splice(likeIndex, 1);
                    }
                    store.dispatch(unlikesSuccess(allLikes));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(unlikesError());
                });
            break;
        default:
            break;
    }
};
