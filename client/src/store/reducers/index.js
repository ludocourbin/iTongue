import { combineReducers } from "redux";
/* Reducers */
import expressionsReducer from "./Admin/expressionsReducer";

import settings from "./settings";
import user from "./user";
import login from "./login";

export default combineReducers({
    settings,
    user,
    expressionsReducer,
    login
});
