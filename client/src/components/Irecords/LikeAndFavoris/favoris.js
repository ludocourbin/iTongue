import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";

// import './Favoris.scss';

const Favoris = ({ addFavoris, unFavoris, record, favorisUser }) => {
    const isFavorite = favorisUser.find((favoris) => favoris.id === record.id);
    const [isFavoris, setIsFavoris] = useState(null);

    useEffect(() => {
        setIsFavoris(isFavorite ? true : false);
    }, [isFavorite]);

    const handleAddFavoris = () => {
        setIsFavoris(!isFavoris);
        if (isFavoris) {
            unFavoris(record.id);
        } else {
            addFavoris(record.id);
        }
    };
    return (
        <div
            onClick={handleAddFavoris}
            className={`${isFavoris ? "isFavorite " : ""}favoris`}
        >
            <Icon name="favorite" />
            {record && record.bookmarkCount}
        </div>
    );
};

export default Favoris;
