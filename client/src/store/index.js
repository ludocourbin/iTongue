import { createStore, compose, applyMiddleware } from "redux";
import rootReducers from "./reducers";
import expressionsMiddleware from "./middlewares/Admin/expressionsMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
    applyMiddleware(expressionsMiddleware)
);

const store = createStore(
    rootReducers,
    enhancers,
);
  
export default store;