import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Header } from "semantic-ui-react";

import Layout from "../../containers/Layout";
import Followers from "./followers";
import Placeholder from "../Placeholder";

import "./ifollowersiFollowing.scss";

const IfollowersiFollowing = ({
    allFollowers,
    allFollowing,
    isLoadingAllFollowers,
    isLoadingAllFollowing,
    fetchIfollowers,
    fetchIfollowing,
}) => {
    const { pathname } = useLocation();
    // console.log(pathname.slice());

    useEffect(() => {
        fetchIfollowers();
        fetchIfollowing();
    }, [fetchIfollowers, fetchIfollowing]);

    const [activeItem, setActiveItem] = useState(pathname.substring(1));
    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    };
    return (
        <Layout>
            <div className="ifollowersiFollowing">
                <Menu className="ifollowersiFollowing-menu" pointing secondary>
                    <Menu.Item
                        className="ifollowersiFollowing-menu__item"
                        name="ifollowers"
                        children={
                            <Header size="small">
                                {allFollowers && allFollowers.length} iFollowers
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
                                {allFollowing && allFollowing.length} iFollowing
                            </Header>
                        }
                        active={activeItem === "ifollowing"}
                        onClick={handleItemClick}
                    />
                </Menu>
            </div>

            {/* Show placeholder in case of loading */}
            {(isLoadingAllFollowers && <Placeholder />) ||
                (isLoadingAllFollowing && <Placeholder />)}

            {activeItem === "ifollowing" ? (
                allFollowing ? (
                    allFollowing.map((following) => (
                        <div className="">
                            <Followers user={following} />
                        </div>
                    ))
                ) : (
                    <div className="">you don't follow anyone</div>
                )
            ) : allFollowers ? (
                allFollowers.map((followers) => (
                    <div className="">
                        <Followers user={followers} />
                    </div>
                ))
            ) : (
                <div className="">no one follow you</div>
            )}
        </Layout>
    );
};

export default IfollowersiFollowing;
