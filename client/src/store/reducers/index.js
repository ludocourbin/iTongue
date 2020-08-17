import { combineReducers } from "redux";
/* Reducers */
import expressionsReducer from "./Admin/expressionsReducer";

import settings from "./settings";
import user from "./user";

export default combineReducers({
    settings,
    user,
    expressionsReducer
});
