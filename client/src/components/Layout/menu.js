import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

const Header = ({ setVisible }) => {
    return (
        <div className="header-nav">
            <Link to="/search">
                <Icon className="header-nav__icon" name="search" size="big" />
            </Link>
            <h1 className="header-nav__title">iTongue</h1>
            <div onClick={() => setVisible()}>
                <Icon className="header-nav__icon" name="sidebar" size="big" />
            </div>
        </div>
    );
};

export default Header;
