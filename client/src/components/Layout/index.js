import React from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import Header from "./menu";
import NavigationBottom from "./navigationBottom";

import "./header.scss";

const LayoutHeader = ({ user, logout, visible, setVisible, ...props }) => {
    return (
        <div className="main-header">
            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    as={Menu}
                    animation="overlay"
                    icon="labeled"
                    onHide={() => setVisible()}
                    vertical
                    direction="right"
                    visible={visible}
                    width="thin"
                >
                    <div className="main-header-links">
                        <div className="container">
                            <NavLink
                                exact
                                className="main-header-links__item"
                                to={"/"}
                            >
                                Accueil
                            </NavLink>
                            <NavLink
                                className="main-header-links__item"
                                to={"/irecords"}
                            >
                                iRecords
                            </NavLink>
                            <NavLink
                                className="main-header-links__item"
                                to={"/users"}
                            >
                                iUsers
                            </NavLink>
                        </div>
                        {user ? (
                            <div onClick={() => logout()} className="container">
                                <NavLink
                                    exact
                                    to="/"
                                    className="main-header-links__item"
                                >
                                    Se déconnecter
                                </NavLink>
                            </div>
                        ) : (
                            <div className="container">
                                <NavLink
                                    className="main-header-links__item"
                                    to={"/login"}
                                >
                                    Connexion
                                </NavLink>
                                <NavLink
                                    className="main-header-links__item"
                                    to={"/signup"}
                                >
                                    Inscription
                                </NavLink>
                            </div>
                        )}

                        <div className="container">
                            <NavLink
                                className="main-header-links__item"
                                to={"/team"}
                            >
                                Team
                            </NavLink>
                            <NavLink
                                className="main-header-links__item"
                                to={"/contact"}
                            >
                                Contact/FAQ
                            </NavLink>
                            <NavLink
                                className="main-header-links__item"
                                to={"/terms"}
                            >
                                Mentions Légales
                            </NavLink>
                        </div>
                    </div>
                </Sidebar>
                <Sidebar.Pusher className="main" dimmed={visible}>
                    <Header visible={visible} setVisible={() => setVisible()} />
                    <div
                        className={user ? "main-content user" : "main-content"}
                    >
                        {props.children}
                    </div>
                    {user ? <NavigationBottom user={user} /> : null}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    );
};

export default LayoutHeader;
// <NavigationBottom />
