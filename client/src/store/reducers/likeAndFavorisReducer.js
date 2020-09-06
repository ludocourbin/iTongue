import {
  FETCH_FAVORIS,
  FETCH_FAVORIS_SUCCESS,
  FETCH_FAVORIS_ERROR,
  FETCH_LIKES,
  FETCH_LIKES_SUCCESS,
  FETCH_LIKES_ERROR,
  UNLIKES_SUCCESS,
  ADD_LIKES_SUCCESS,
  ADD_FAVORIS_SUCCESS,
  UNFAVORIS_SUCCESS
} from "../actions/likeAndFavorisActions";

const initialState = {
  allFavoris: [],
  isLoadingAllFavoris: false,
  allLikes: [],
  isLoadingAllLikes: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_FAVORIS:
      return {
        ...state,
        isLoadingAllFavoris: true,
        allFavoris: []
      };
    case FETCH_FAVORIS_SUCCESS:
      return {
        ...state,
        allFavoris: [...action.payload],
        isLoadingAllFavoris: false
      };
    case FETCH_FAVORIS_ERROR:
      return {
        ...state,
        allFavoris: [],
        isLoadingAllFavoris: false
      };
    case FETCH_LIKES:
      return {
        ...state,
        isLoadingAllLikes: true,
        allLikes: []
      };
    case FETCH_LIKES_SUCCESS:
      return {
        ...state,
        allLikes: [...action.payload],
        isLoadingAllLikes: false
      };
    case FETCH_LIKES_ERROR:
      return {
        ...state,
        allLikes: [],
        isLoadingAllLikes: false
      };
    case ADD_LIKES_SUCCESS:
      return {
        ...state,
        allLikes: [...action.payload]
      };
    case UNLIKES_SUCCESS:
      return {
        ...state,
        allLikes: [...action.payload]
      };
    case ADD_FAVORIS_SUCCESS:
      return {
        ...state,
        allFavoris: [...action.payload]
      };
    case UNFAVORIS_SUCCESS:
      return {
        ...state,
        allFavoris: [...action.payload]
      };
    default:
      return state;
  }
};
