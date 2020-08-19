import React from "react";

/* Components */
import { Header, Menu, Image, Icon, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

/* Styles */
import "./headeradmin.scss";

const HeaderAdmin = ( { logout, currentUser, ...props } ) => {
    
    const handdleLogout = () => {
        logout();
    };

    const options = [
        { key: 'sign-out', text: 'Déconnexion', icon: 'sign out', onClick:handdleLogout },
    ];
    
    const trigger = (
        <Image
            src="https://ca.slack-edge.com/TUZFANP45-U0102DYQRUL-b7d05e08f84a-512"
            avatar
            size="mini"
            spaced="left"
        />
    );

    return (
        <>
            <Menu borderless className="header-admin" secondary>
                <Menu.Item>
                    <NavLink to="/admin" activeClassName="active">
                        <Header size="large">Dashboard</Header>
                    </NavLink>
                </Menu.Item>
                <Menu.Item className="header-admin links">
                    <NavLink
                        to="/admin"
                        exact
                        activeClassName="active"
                        className="header-admin links__item"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/admin/expressions"
                        activeClassName="active"
                        className="header-admin links__item"
                    >
                        Expressions
                    </NavLink>
                </Menu.Item>
                <Menu.Item>
                    <span><b>Gautier Colasse</b></span>
                    <Dropdown
                    trigger={trigger}
                    options={options}
                    pointing='top right'
                    icon={null}
                    />
                </Menu.Item>
            </Menu>

            <div className="main">{props.children}</div>
        </>
    );
};

export default HeaderAdmin;
