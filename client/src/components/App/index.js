import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/* Components */

import Signup from "../../containers/Signup";
<<<<<<< HEAD
import Search from "../Search";
=======
>>>>>>> sign up page okey

/* Styles */
import "semantic-ui-css/semantic.min.css";
import "./app.scss";

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
<<<<<<< HEAD
                <Route path="/search" component={Search} />
=======

>>>>>>> sign up page okey
                <Route path="/login">{/* <Login />*/}</Route>

                <Route path="/admin" exact>
                    {/* <LoginAdmin /> OU <Dashboard /> */}
                </Route>

                <Route path="/admin/expressions">{/* <Expressions />*/}</Route>

                <Route>
                    <h1>La page n'existe pas</h1>
                </Route>
            </Switch>
        </div>
    );
};

export default App;
