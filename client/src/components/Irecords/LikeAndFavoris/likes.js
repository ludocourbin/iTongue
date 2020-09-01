import React from "react";
import { Icon } from "semantic-ui-react";
// import './Likes.scss';

const Likes = ({ record, addLikes, unlikes }) => {
    return (
        <div onClick={() => addLikes(record.id)}>
            <Icon className="likes" name="thumbs up" />
            {record && record.likeCount}
        </div>
    );
};

export default Likes;
