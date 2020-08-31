import React, { useState } from "react";
import { Image, Header, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import './Followers.scss';

const Followers = ({ user }) => {
    const [followed, setFollowed] = useState(true);
    return (
        <div className="followers-card">
            <div className="followers-card_left">
                <Image
                    floated="left"
                    size="mini"
                    className="avatar"
                    avatar
                    src={
                        user.avatarUrl == null
                            ? "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
                            : `${process.env.REACT_APP_FILES_URL}/${user.avatarUrl}`
                    }
                />
                <div>
                    <Link to={`user/${user.slug}`}>
                        <Header className="fullname">
                            {user.firstname} {user.lastname}
                        </Header>
                    </Link>
                </div>
            </div>

            <div className="followers-card_right">
                <Label className={followed ? "" : "follow-btn"}>
                    {followed ? (
                        <span>Abonné</span>
                    ) : (
                        <span className="follow-btn">S'abonner</span>
                    )}

                    <Icon
                        onClick={() => setFollowed(!followed)}
                        name={followed ? "delete" : "add"}
                    />
                </Label>
            </div>
        </div>
    );
};

export default Followers;
