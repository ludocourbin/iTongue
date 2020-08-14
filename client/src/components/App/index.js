import React from "react";
import { Route, Switch } from "react-router-dom";

//import components
import Signup from "../Signup";

/* Styles */
import "semantic-ui-css/semantic.min.css";
import "./app.scss";

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route path="/" exact>
                    {/* <Home /> */}
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
