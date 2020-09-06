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
    count,
    setCount,
}) => {
    /* handle following of other page's */
    // console.log(currentUser.followed);
    // const isFollowing = currentUser.followed.some(
    //     (userFollowing) => userFollowing.id === user.id
    // );

    // const [following, setFollowing] = useState(isFollowing);
    const isFollowing = currentUser.followed.find(
        (userFollowing) => userFollowing.id === user.id
    );

    const [following, setFollowing] = useState(isFollowing ? true : false);

    const handleFollow = () => {
        const wasFollowing = following;

        setFollowing(!wasFollowing);

        if (wasFollowing) {
            unFollow(user);
        } else {
            follow(user);
        }
    };

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
                            <span>unFollow</span>
                        ) : (
                            <span className="follow-btn">Following</span>
                        )}

                        <Icon
                            onClick={handleFollow}
                            name={following ? "delete" : "add"}
                        />
                    </Label>
                ) : currentUserId !== userSlugId && !isUser ? (
                    <Label className={following ? "not-follow-btn" : "follow-btn"}>
                        {following ? (
                            <span>Abonné(e)</span>
                        ) : (
                            <span className="">Follow</span>
                        )}
                        <Icon
                            onClick={handleFollow}
                            name={following ? "delete" : "add"}
                        />
                    </Label>
                ) : null}
            </div>
        </div>
    );
};

export default Followers;
