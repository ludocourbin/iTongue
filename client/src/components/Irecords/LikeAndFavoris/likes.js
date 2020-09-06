import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
// import './Likes.scss';

const Likes = ({ record, addLikes, unlikes, likesUser, isLogged }) => {
  const [isLiked, setIsLiked] = useState(likesUser.some(like => like.id === record.id));
  const [count, setCount] = useState(record.likeCount);

  const handleLikes = () => {
    if (!isLogged) return;

    const wasLiked = isLiked;

    if (wasLiked) {
      unlikes(record.id);
      setCount(count - 1);
    } else {
      addLikes(record);
      setCount(count + 1);
    }

    setIsLiked(!wasLiked);
  };

  return (
    <div onClick={handleLikes}>
      <Icon className={`${isLiked ? "isFavorite " : ""}likes`} name="thumbs up" />
      {count}
    </div>
  );
};

export default Likes;
