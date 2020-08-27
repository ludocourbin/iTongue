import { combineReducers } from "redux";

// Admin
import expressionsReducer from "./Admin/expressionsReducer";
import loginAdminReducer from "./Admin/loginAdminReducer";
import statisticsRecuder from "./Admin/statisticsRecuder";

/* Reducers */
import settings from "./settings";
import user from "./user";
import irecords from "./irecords";
import languagesReducer from './languagesReducer';
import team from './team';

export default combineReducers({
    settings,
    user,
    expressionsReducer,
    loginAdminReducer,
    irecords,
    languagesReducer,
    statisticsRecuder,
    team
});
