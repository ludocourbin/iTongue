import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/* Components */

import Signup from "../../containers/Signup";
import Search from "../Search";
import Login from "../../containers/Login";
import IrecordsPage from "../IrecordsPage";
import IusersPage from "../IusersPage";
import Home from "../Home";

/* Styles */
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./app.scss";

/* Components */
import Admin from "../../containers/Admin/Index";
import Profil from "../../containers/User/Profil";

const App = ({ user, isLogged }) => {
    // <Route path="/login" component={Login} />

    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" render={() => <Signup />} />
                <Route
                    path="/login"
                    render={() => (user ? <Redirect to="/" /> : <Login />)}
                />
                <Route path="/search" component={Search} />
                <Route path="/irecords" component={IrecordsPage} />
                <Route path="/users" component={IusersPage} />
                <Route path={`/user/${user.slug}`} component={Profil} />
                <Route path="/admin" component={Admin} />
                <Route>
                    <h1>La page n'existe pas</h1>
                </Route>
            </Switch>
        </div>
    );
};

export default App;
