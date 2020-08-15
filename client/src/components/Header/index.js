import React from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import Header from "./menu";

import "./header.scss";

const LayoutHeader = ({ visible, setVisible, ...props }) => {
    return (
        <div className="menu">
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
                    <div className="menu-links">
                        <div className="menu-links--container">
                            <NavLink
                                exact
                                className="menu-links--item"
                                to={"/"}
                            >
                                Accueil
                            </NavLink>
                            <NavLink
                                className="menu-links--item"
                                to={"/irecords"}
                            >
                                iRecords
                            </NavLink>
                            <NavLink className="menu-links--item" to={"/users"}>
                                iUsers
                            </NavLink>
                        </div>
                        <div className="menu-links--container">
                            <NavLink className="menu-links--item" to={"/login"}>
                                Connexion
                            </NavLink>
                            <NavLink
                                className="menu-links--item"
                                to={"/signup"}
                            >
                                Inscription
                            </NavLink>
                        </div>
                        <div className="menu-links--container">
                            <NavLink className="menu-links--item" to={"/team"}>
                                Team
                            </NavLink>
                            <NavLink
                                className="menu-links--item"
                                to={"/contact"}
                            >
                                Contact/FAQ
                            </NavLink>
                            <NavLink className="menu-links--item" to={"/terms"}>
                                Mentions Légales
                            </NavLink>
                        </div>
                    </div>
                </Sidebar>
                <Sidebar.Pusher dimmed={visible}>
                    <Header visible={visible} setVisible={() => setVisible()} />
                    <div className="">{props.children}</div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    );
};

export default LayoutHeader;
