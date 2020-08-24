import { combineReducers } from "redux";

// Admin
import expressionsReducer from "./Admin/expressionsReducer";
import loginAdminReducer from "./Admin/loginAdminReducer";

/* Reducers */
import settings from "./settings";
import user from "./user";
import irecords from "./irecords";
import languagesReducer from './languagesReducer';

export default combineReducers({
    settings,
    user,
    expressionsReducer,
    loginAdminReducer,
    irecords,
    languagesReducer,
});
