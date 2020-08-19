import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

const Header = ({ setVisible }) => {
    return (
        <div className="header">
            <Link to="/search">
                <Icon className="header-icon" name="search" size="big" />
            </Link>
            <h1 className="header-title">iTongue</h1>
            <div onClick={() => setVisible()}>
                <Icon className="header-icon" name="sidebar" size="big" />
            </div>
        </div>
    );
};

export default Header;
