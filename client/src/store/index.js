import { createStore, compose, applyMiddleware } from "redux";
import rootReducers from "./Reducers";
import authMiddleware from "./Middlewares/authMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(authMiddleware));

const store = createStore(rootReducers, enhancers);

export default store;
