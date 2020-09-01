import {
    FETCH_FAVORIS,
    FETCH_FAVORIS_SUCCESS,
    FETCH_FAVORIS_ERROR,
} from "../actions/likeAndFavorisActions";

const initialState = {
    allFavoris: [],
    isLoadingAllFavoris: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_FAVORIS:
            return {
                ...state,
                isLoadingAllFavoris: true,
                allFavoris: [],
            };
        case FETCH_FAVORIS_SUCCESS:
            return {
                ...state,
                allFavoris: [...action.payload],
                isLoadingAllFavoris: false,
            };
        case FETCH_FAVORIS_ERROR:
            return {
                ...state,
                allFavoris: [],
                isLoadingAllFavoris: false,
            };
        default:
            return state;
    }
};
