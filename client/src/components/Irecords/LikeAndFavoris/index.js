import React from "react";
import { Icon } from "semantic-ui-react";
import Likes from "./likes";
import Favoris from "./favoris";
import "./likeandfavoris.scss";

const LikeAndFavoris = ({ record }) => {
    return (
        <div className="likeandfavoris">
            <Likes record={record} />
            <Favoris />
        </div>
    );
};

export default LikeAndFavoris;
