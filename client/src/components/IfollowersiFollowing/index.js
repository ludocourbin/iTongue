import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import Layout from "../../containers/Layout";

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
                        active={activeItem === "ifollowers"}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        className="ifollowersiFollowing-menu__item"
                        name="ifollowing"
                        active={activeItem === "ifollowing"}
                        onClick={handleItemClick}
                    />
                </Menu>
            </div>
        </Layout>
    );
};

export default IfollowersiFollowing;
