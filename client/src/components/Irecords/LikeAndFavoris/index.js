import React, { useEffect } from "react";
import Likes from "./likes";
import Favoris from "./favoris";
import "./likeandfavoris.scss";

const LikeAndFavoris = ({
    record,
    addFavoris,
    unFavoris,
    addLikes,
    unlikes,
    favorisUser,
    likesUser,
}) => {
    return (
        <div className="likeandfavoris">
            <Likes
                likesUser={likesUser}
                record={record}
                addLikes={addLikes}
                unlikes={unlikes}
            />
            <Favoris
                favorisUser={favorisUser}
                record={record}
                unFavoris={unFavoris}
                addFavoris={addFavoris}
            />
        </div>
    );
};

export default LikeAndFavoris;
