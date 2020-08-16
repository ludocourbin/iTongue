import { combineReducers } from 'redux';

/* Reducers */
import expressionsReducer from './Admin/expressionsReducer';

export default combineReducers({
    expressionsReducer: expressionsReducer,
});