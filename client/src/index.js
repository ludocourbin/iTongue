import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import withTracker from "./components/withTrackers";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";

/* Redux */
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <Route component={withTracker(App)} />
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
