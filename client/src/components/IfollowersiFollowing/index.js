import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, Header, Icon } from "semantic-ui-react";

import Layout from "../../containers/Layout";
import Followers from "./followers";
import Following from "./following";
import Placeholder from "../Placeholder";

import "./ifollowersiFollowing.scss";

const IfollowersiFollowing = ({ currentUser, userSlugInfos, follow, unFollow }) => {
    const { pathname } = useLocation();

    const { followed, followers } = userSlugInfos;

    const [activeItem, setActiveItem] = useState(pathname.substring(1));
    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    };

    return (
        <Layout titlePage="Follows">
            <div className="ifollowersiFollowing">
                <Header size="tiny" className="ifollowersiFollowing-profil_back">
                    <Link to={`/user/${userSlugInfos.slug}`}>
                        <Icon name="chevron circle left" size="small" />
                        Retour au profil
                    </Link>
                </Header>
                <Menu className="ifollowersiFollowing-menu" pointing secondary>
                    <Menu.Item
                        className="ifollowersiFollowing-menu__item"
                        name="ifollowers"
                        children={
                            <Header size="small">
                                {followers ? followers.length : 0} iFollowers
                            </Header>
                        }
                        active={activeItem === "ifollowers"}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        className="ifollowersiFollowing-menu__item"
                        name="ifollowing"
                        children={
                            <Header size="small">
                                {followed ? followed.length : 0} iFollowing
                            </Header>
                        }
                        active={activeItem === "ifollowing"}
                        onClick={handleItemClick}
                    />
                </Menu>
            </div>

            {activeItem === "ifollowing" ? (
                followed ? (
                    followed.map((following) => (
                        <Following
                            key={following.id}
                            allFollowing={followed}
                            user={following}
                            currentUser={currentUser}
                            currentUserId={currentUser.id}
                            userSlugId={userSlugInfos.id}
                            follow={follow}
                            unFollow={unFollow}
                        />
                    ))
                ) : (
                    <div className="">you don't follow anyone</div>
                )
            ) : followers ? (
                followers.map((follower) => (
                    <Followers
                        key={follower.id}
                        allFollowing={followed}
                        currentUserId={currentUser.id}
                        currentUser={currentUser}
                        userSlugId={userSlugInfos.id}
                        follow={follow}
                        unFollow={unFollow}
                        user={follower}
                    />
                ))
            ) : (
                <div className="">no one follow you</div>
            )}
        </Layout>
    );
};

export default IfollowersiFollowing;
