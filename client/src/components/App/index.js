import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/* Components */

import Signup from "../../containers/Signup";
import Search from "../Search";
import Login from "../../containers/Login";

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
                <Route exact path="/">
                    <h1>Home page</h1>
                </Route>

                <Route
                    exact
                    path="/signup"
                    render={() => (user ? <Redirect to="/" /> : <Signup />)}
                />
                <Route path="/search" component={Search} />
                <Route path="/login" component={Login} />

                <Route path="/admin" component={Admin} />

                <Route>
                    <h1>La page n'existe pas</h1>
                </Route>
            </Switch>
        </div>
    );
};

export default App;
