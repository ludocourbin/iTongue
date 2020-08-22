import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const NavigationBottom = ({
    user,
    toggleRecording,
    isRecording,
    selectIrecordToRecord,
}) => {
    let slug = useParams();

    const handleClick = () => {
        if (isRecording) {
            toggleRecording(false);
        } else {
            selectIrecordToRecord(null);
            toggleRecording(true);
        }
    };

    return (
        <div className="navigationBottom">
            <NavLink
                to={`/user/${user.slug}`}
                activeClassName="active-navbottom"
            >
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
            <div onClick={handleClick}>
                <Icon
                    className="header-icon navigationBottom-items"
                    name="microphone"
                    size="big"
                    disabled
                />
            </div>
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

// activeClassName="active-navbottom"
