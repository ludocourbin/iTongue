import { createStore, compose, applyMiddleware } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
import rootReducers from "./reducers";
import authMiddleware from "./middlewares/authMiddleware";
import expressionsMiddleware from "./middlewares/Admin/expressionsMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
    applyMiddleware(authMiddleware, expressionsMiddleware)
);

const store = createStore(rootReducers, enhancers);

export default store;
