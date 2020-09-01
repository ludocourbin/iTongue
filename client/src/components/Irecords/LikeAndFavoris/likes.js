import React from "react";
import { Icon } from "semantic-ui-react";
// import './Likes.scss';

const Likes = ({ record }) => {
    return (
        <div>
            <Icon className="likes" name="thumbs up" />
            {record && record.likeCount}
        </div>
    );
};

export default Likes;
