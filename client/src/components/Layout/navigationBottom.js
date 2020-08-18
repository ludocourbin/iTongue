import React from "react";
import { Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const NavigationBottom = ({ user }) => {
    return (
        <div className="navigationBottom">
            <NavLink to={user.slug}>
                <Icon
                    className="header-icon navigationBottom-items"
                    name="user"
                    size="big"
                />
            </NavLink>

            <NavLink to="/">
                <Icon
                    className="header-icon navigationBottom-items"
                    name="home"
                    size="big"
                />
            </NavLink>
        </div>
    );
};

export default NavigationBottom;
