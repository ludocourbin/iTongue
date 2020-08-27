import { combineReducers } from "redux";

// Admin
import expressionsReducer from "./Admin/expressionsReducer";
import statisticsRecuder from "./Admin/statisticsRecuder";

/* Reducers */
import settings from "./settings";
import user from "./user";
import irecords from "./irecords";
import languagesReducer from "./languagesReducer";
import statisticsHomeReducer from "./statisticsHomeReducer";

export default combineReducers({
    settings,
    user,
    expressionsReducer,
    irecords,
    languagesReducer,
    statisticsRecuder,
    statisticsHomeReducer,
});
