import React from "react";
import { Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const NavigationBottom = ({ user }) => {
    return (
        <div className="navigationBottom">
            <NavLink to={"user/slug"}  activeClassName="active-navbottom">
                <Icon
                    className="header-icon navigationBottom-items"
                    name="user"
                    size="big"
                />
            </NavLink>
            <NavLink to="/feed" activeClassName="active-navbottom">
                <Icon
                    className="header-icon navigationBottom-items"
                    name="globe"
                    size="big"
                    disabled
                />
            </NavLink>
            <NavLink to="/recording" activeClassName="active-navbottom">
                <Icon
                    className="header-icon navigationBottom-items"
                    name="microphone"
                    size="big"
                    disabled
                />
            </NavLink>
            <NavLink to="/messages" activeClassName="active-navbottom">
                <Icon
                    className="header-icon navigationBottom-items"
                    name="send"
                    size="big"
                    disabled
                />
            </NavLink>
            <NavLink to="/likes" activeClassName="active-navbottom">
                <Icon
                    className="header-icon navigationBottom-items"
                    name="heart"
                    size="big"
                    disabled
                />
            </NavLink>
        </div>
    );
};

export default NavigationBottom;
