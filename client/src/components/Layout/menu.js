import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import Logo from "../../assets/logo.png";

const Header = ({ setVisible, pathname, ...props }) => {
    return (
        <div className="header-nav">
            <Link to="/search">
                <Icon
                    disabled={pathname === "/search" ? true : false}
                    className={
                        pathname === "/search"
                            ? "invisible"
                            : "header-nav__icon"
                    }
                    name="search"
                    size="big"
                />
            </Link>
            <img src={Logo} className="header-nav__logo" alt="logo iTongue" />
            <div onClick={() => setVisible()}>
                <Icon className="header-nav__icon" name="sidebar" size="big" />
            </div>
        </div>
    );
};

export default Header;

// <h1 className="header-nav__title">iTongue</h1>
