import React from "react";
import { Icon } from "semantic-ui-react";

const Header = ({ setVisible, visible }) => {
    return (
        <div className="header">
            <Icon className="header-icon" name="search" size="big" />
            <h1 className="header-title">Itongue</h1>
            <div onClick={() => setVisible(!visible)}>
                <Icon className="header-icon" name="sidebar" size="big" />
            </div>
        </div>
    );
};

export default Header;
