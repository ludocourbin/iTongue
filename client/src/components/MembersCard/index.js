import React from "react";
import { Image, Flag } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./memberCard.scss";

const MemberCard = ({ user }) => (
    <Link to={`user/${user.slug}`}>
        {console.log(user)}
        <div className="member-card" fluid>
            <div className="member-card_left">
                <Image
                    floated="left"
                    size="mini"
                    className="avatar"
                    avatar
                    src={ user.avatarUrl == null ?
                        "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg" 
                        :
                        `${process.env.REACT_APP_FILES_URL}/${user.avatarUrl}`
                    }
                />
                <div>
                    <h3 className="fullname">
                        {user.firstname} {user.lastname}
                    </h3>
                    <p className="records">
                        {user.records ? user.records.length : 0} iRecords
                    </p>
                </div>
            </div>

            <div className="member-card_right">
                {user.taughtLanguages && user.taughtLanguages.map((language) => (
                    <Flag key={language.id} name={language.code} />
                ))}
            </div>
        </div>
    </Link>
);

export default MemberCard;
