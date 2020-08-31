import React, { useState } from "react";
import { Image, Header, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import './Followers.scss';

const Followers = ({ user, currentUserId, userSlugId, allFollowers }) => {
    const isFollowing = allFollowers.find(
        (userFollowing) => userFollowing.id === user.id
    );
    const [following, setFollowing] = useState(isFollowing ? true : false);

    const isUser = user.id === currentUserId;
    return (
        <div className="following-card">
            <div className="following-card_left">
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

            <div className="following-card_right">
                {currentUserId === userSlugId && !isUser ? (
                    <Label className={following ? "" : "follow-btn"}>
                        {following ? (
                            <span>Supprimer</span>
                        ) : (
                            <span className="follow-btn">Ajouter</span>
                        )}

                        <Icon
                            onClick={() => setFollowing(!following)}
                            name={following ? "delete" : "add"}
                        />
                    </Label>
                ) : currentUserId !== userSlugId && !isUser ? (
                    <Label className={following ? "" : "follow-btn"}>
                        {following ? (
                            <span>Abonné(e)</span>
                        ) : (
                            <span className="">S'abonner</span>
                        )}
                        <Icon
                            onClick={() => setFollowing(!following)}
                            name={following ? "delete" : "add"}
                        />
                    </Label>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};

export default Followers;
