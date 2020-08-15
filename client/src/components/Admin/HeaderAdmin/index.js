import React from 'react';

import { Header, Menu, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import './headeradmin.scss';

const HeaderAdmin = () => {

    return (
        <Menu borderless className="header-admin">
            <Menu.Item>
                <NavLink to="/admin/home" activeClassName="active">
                    <Header size="large">Dashboard</Header>
                </NavLink>
            </Menu.Item>
            <Menu.Item className="header-admin links">
                <NavLink to="/admin/home" activeClassName="active" className="header-admin links__item">
                    Home
                </NavLink>
                <NavLink to="/admin/expressions" activeClassName="active" className="header-admin links__item">
                    Expressions
                </NavLink>
            </Menu.Item>
            <Menu.Item>
                <span>Gautier Colasse</span>
                <Image src="https://ca.slack-edge.com/TUZFANP45-U0102DYQRUL-b7d05e08f84a-512" avatar spaced="left"/>
            </Menu.Item>
        </Menu>
    );
};

export default HeaderAdmin;