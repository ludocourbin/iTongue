import React from "react";
import { Route, Switch } from "react-router-dom";

/* Components */

import Signup from "../Signup";

/* Styles */
import "semantic-ui-css/semantic.min.css";
import "./app.scss";

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <h1>Home page</h1>
                </Route>

                <Route path="/signup">
                    <Signup />
                </Route>

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
