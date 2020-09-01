import React, { useState, useEffect } from "react";
import { Image, Header, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import './Followers.scss';

const Followers = ({
    user,
    currentUserId,
    userSlugId,
    unFollow,
    follow,
    allFollowing,
    currentUser,
}) => {
    const [following, setFollowing] = useState(true);
    const [followingOtherUserPage, setFollowingOtherUserPage] = useState(null);

    const handleFollow = () => {
        setFollowing(!following);
        changeFollowStatus();
    };

    const changeFollowStatus = () => {
        following ? unFollow(user.id) : follow(user.id);
    };

    const isUser = user.id === currentUserId;

    /* handle following of other page's */
    console.log(currentUser.followed);
    const isFollowing = currentUser.followed.find(
        (userFollowing) => userFollowing.id === user.id
    );

    const handleFollowOtherUserPage = () => {
        if (followingOtherUserPage) {
            unFollow(user.id);
            setFollowingOtherUserPage(false);
        } else {
            setFollowingOtherUserPage(true);
            follow(user.id);
        }
    };

    // console.log(isFollowing);

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
                            onClick={handleFollow}
                            name={following || followingOtherUserPage ? "delete" : "add"}
                        />
                    </Label>
                ) : currentUserId !== userSlugId && !isUser ? (
                    <Label
                        className={
                            isFollowing || followingOtherUserPage
                                ? "not-follow-btn"
                                : "follow-btn"
                        }
                    >
                        {isFollowing || followingOtherUserPage ? (
                            <span>Abonné(e)</span>
                        ) : (
                            <span className="">S'abonner</span>
                        )}
                        <Icon
                            onClick={handleFollowOtherUserPage}
                            name={isFollowing ? "delete" : "add"}
                        />
                    </Label>
                ) : null}
            </div>
        </div>
    );
};

export default Followers;
