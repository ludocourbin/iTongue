import React, { useState } from "react";
import { Image, Header, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import './Followers.scss';

const Followers = ({ user }) => {
    const [following, setFollowing] = useState(true);
    return (
        <div className="followers-card">
            <div className="followers-card_left">
                <Image
                    floated="left"
                    size="mini"
                    className="avatar"
                    avatar
                    src={
                        user.avatarUrl == null
                            ? "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
                            : `${process.env.REACT_APP_FILES_URL}/${user.avatarUrl}`
                    }
                />
                <div>
                    <Link to={`user/${user.slug}`}>
                        <Header className="fullname">
                            {user.firstname} {user.lastname}
                        </Header>
                    </Link>
                </div>
            </div>

            <div className="followers-card_right">
                <Label color={following ? "red" : "green"}>
                    {following ? (
                        <span>Supprimer</span>
                    ) : (
                        <span className="follow-btn">Ajouter</span>
                    )}

                    <Icon
                        onClick={() => setFollowing(!following)}
                        name={following ? "delete" : "add"}
                    />
                </Label>
            </div>
        </div>
    );
};

export default Followers;
