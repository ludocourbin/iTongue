export const FETCH_FAVORIS = "FETCH_FAVORIS";
export const FETCH_FAVORIS_SUCCESS = "FETCH_FAVORIS_SUCCESS";
export const FETCH_FAVORIS_ERROR = "FETCH_FAVORIS_ERROR";

export const fetchFavoris = () => ({
    type: FETCH_FAVORIS,
});
export const fetchFavorisSuccess = (payload) => ({
    type: FETCH_FAVORIS_SUCCESS,
    payload,
});
export const fetchFavorisError = () => ({
    type: FETCH_FAVORIS_ERROR,
});

export const ADD_LIKES = "ADD_LIKES";
export const ADD_LIKES_SUCCESS = "ADD_LIKES_SUCCESS";
export const ADD_LIKES_ERROR = "ADD_LIKES_ERROR";

export const fetchLikes = () => ({
    type: ADD_LIKES,
});
export const fetchFavorisSuccess = (payload) => ({
    type: ADD_LIKES_SUCCESS,
    payload,
});
export const fetchFavorisError = () => ({
    type: ADD_LIKES_ERROR,
});
