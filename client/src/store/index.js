import { createStore, compose, applyMiddleware } from "redux";
import rootReducers from "./reducers";
import authMiddleware from "./middlewares/authMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(authMiddleware));

const store = createStore(rootReducers, enhancers);

export default store;
