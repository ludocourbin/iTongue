import { combineReducers } from "redux";

/* Reducers */

// Admin
import expressionsReducer from "./Admin/expressionsReducer";
import loginAdminReducer from "./Admin/loginAdminReducer";

// App
import settings from "./settings";
import user from "./user";
import login from "./login";

export default combineReducers({
    settings,
    user,
    expressionsReducer,
    login,
    loginAdminReducer,
});
