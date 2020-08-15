import { createStore, compose, applyMiddleware } from "redux";
import rootReducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers();
/* 
     applyMiddleware(
         firstMiddleware
     )
    */

const store = createStore(rootReducers, enhancers);

export default store;
