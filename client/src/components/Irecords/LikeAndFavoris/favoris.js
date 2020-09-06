import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
// import './Favoris.scss';

const Favoris = ({ addFavoris, unFavoris, record, favorisUser, isLogged }) => {
  const [isBookmark, setIsBookmark] = useState(
    favorisUser.some(bookmark => bookmark.id === record.id)
  );
  const [count, setCount] = useState(record.bookmarkCount);

  const handleAddFavoris = () => {
    if (!isLogged) return;

    const wasBookmark = isBookmark;

    if (wasBookmark) {
      unFavoris(record.id);
      setCount(count - 1);
    } else {
      addFavoris(record);
      setCount(count + 1);
    }

    setIsBookmark(!wasBookmark);
  };
  return (
    <div onClick={handleAddFavoris}>
      <Icon className={`${isBookmark ? "isFavorite " : ""}favoris`} name="favorite" />
      {count}
    </div>
  );
};

export default Favoris;
