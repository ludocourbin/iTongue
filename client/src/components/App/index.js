import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/* Components */

import Signup from "../../containers/Signup";
import Search from "../Search";
import Login from "../../containers/Login";
import IrecordsPage from "../IrecordsPage";
import Home from "../Home";

/* Styles */
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./app.scss";

/* Components */
import Admin from "../../containers/Admin/Index";

const App = ({ user }) => {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route
                    exact
                    path="/signup"
                    render={() => (user ? <Redirect to="/" /> : <Signup />)}
                />
                <Route path="/search" component={Search} />
                <Route path="/login" component={Login} />
                <Route path="/irecords" component={IrecordsPage} />

                <Route path="/admin" component={Admin} />

                <Route>
                    <h1>La page n'existe pas</h1>
                </Route>
            </Switch>
        </div>
    );
};

export default App;
