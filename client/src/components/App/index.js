import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/* Components */

import Contact from "../Contact";
import Terms from "../Terms";
import Conversations from "../Chat/Conversations/index.js";
import Message from "../Chat/Message/index.js";

/* Styles */
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./app.scss";

/* Containers */
import Signup from "../../containers/Signup";
import Login from "../../containers/Login";
import Admin from "../../containers/Admin/Index";
import Profil from "../../containers/User/Profil";
import EditProfil from "../../containers/User/EditProfil";
import IrecordsPage from "../../containers/IrecordsPage";
import IusersPage from "../../containers/IusersPage";
import Search from "../../containers/Search";
import Feed from "../../containers/Feed";
import Home from "../../containers/Home";
import IfollowersiFollowing from "../../containers/ifollowersifollowing";
import Favoris from "../../containers/Favoris";

const App = ({ isLogged, setCaptchaToken }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://www.google.com/recaptcha/api.js?render=6Lc948MZAAAAAHbqOeJ8QPogf8mHhgrv25BzveZV";

        script.addEventListener("load", () => {
            window.grecaptcha.ready((_) => {
                window.grecaptcha
                    .execute("6Lc948MZAAAAAHbqOeJ8QPogf8mHhgrv25BzveZV", {
                        action: "itongue",
                    })
                    .then((token) => {
                        setCaptchaToken(token);
                        document
                            .querySelector(".grecaptcha-badge")
                            .classList.add("hidden");
                    });
            });
        });

        document.body.appendChild(script);
    }, [setCaptchaToken]);

    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route
                    path="/signup"
                    render={() => (isLogged ? <Redirect to="/feed" /> : <Signup />)}
                />
                <Route
                    path="/login"
                    render={() => (isLogged ? <Redirect to="/feed" /> : <Login />)}
                />
                <Route path="/search" component={Search} />
                <Route path="/irecords" component={IrecordsPage} />
                <Route path="/users" component={IusersPage} />
                <Route exact path="/user/:slug" component={Profil} />
                <Route exact path="/contact" component={Contact} />
                <Route
                    exact
                    path="/user/:slug/edit"
                    render={() => (isLogged ? <EditProfil /> : <Redirect to="/login" />)}
                />
                <Route
                    exact
                    path="/feed"
                    render={() => (isLogged ? <Feed /> : <Redirect to="/login" />)}
                />
                <Route
                    exact
                    path="/favoris"
                    render={() => (isLogged ? <Favoris /> : <Redirect to="/login" />)}
                />
                <Route exact path="/messages" component={Conversations} />
                <Route exact path="/messages/conversation" component={Message} />
                <Route exact path="/ifollowers" component={IfollowersiFollowing} />
                <Route exact path="/ifollowing" component={IfollowersiFollowing} />
                <Route path="/admin" component={Admin} />
                <Route exact path="/terms" component={Terms} />
                <Route>
                    <h1>La page n'existe pas</h1>
                </Route>
            </Switch>
        </div>
    );
};
export default App;
