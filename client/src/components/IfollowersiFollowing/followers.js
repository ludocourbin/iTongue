import React, { useState } from "react";
import { Image, Header, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useReducer } from "react";
// import './Followers.scss';

const Followers = ({
    user,
    follow,
    unFollow,
    currentUserId,
    currentUser,
    userSlugId,
    setFollowedCount,
    setCount,
    count,
}) => {
    const isFollowing = currentUser.followed.find(
        (userFollowing) => userFollowing.id === user.id
    );

    const [following, setFollowing] = useState(isFollowing ? true : false);

    const handleFollow = () => {
        setFollowing(!following);
        changeFollowStatus();
    };

    const changeFollowStatus = () => {
        if (following) {
            unFollow(user);
        } else {
            follow(user);
        }
    };

    const isUser = user.id === currentUserId;

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

            {!isUser && userSlugId === currentUserId ? (
                <div className="followers-card_right">
                    <Label className={following ? "" : "follow-btn"}>
                        {following ? (
                            <span>Following</span>
                        ) : (
                            <span className="follow-btn">Follow</span>
                        )}

                        <Icon
                            onClick={handleFollow}
                            name={following ? "delete" : "add"}
                        />
                    </Label>
                </div>
            ) : !isUser && userSlugId !== currentUserId ? (
                <div className="followers-card_right">
                    <Label className={following ? "" : "follow-btn"}>
                        {following ? (
                            <span>Following</span>
                        ) : (
                            <span className="follow-btn">Follow</span>
                        )}

                        <Icon
                            onClick={handleFollow}
                            name={following ? "delete" : "add"}
                        />
                    </Label>
                </div>
            ) : null}
        </div>
    );
};

export default Followers;
