import { createStore, compose, applyMiddleware } from "redux";
import rootReducers from "./reducers";
import authMiddleware from "./middlewares/authMiddleware";
import expressionsMiddleware from "./middlewares/Admin/expressionsMiddleware";
import { loginAdminMiddleware } from './middlewares/Admin/loginAdminMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(authMiddleware, expressionsMiddleware, loginAdminMiddleware));

const store = createStore(rootReducers, enhancers);

export default store;
