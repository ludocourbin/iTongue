import { 
    FETCH_ALL_LANGUAGES, 
    FETCH_ALL_LANGUAGES_SUCCESS, 
    FETCH_ALL_LANGUAGES_ERROR 
} 
from "../actions/languagesAction";

const initialState = {

};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_ALL_LANGUAGES:
            return {
                ...state,
            };
        default:
            return state;
    }
};
