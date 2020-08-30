import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "semantic-ui-react";
import './follow.scss';

const Follow = ({ userSlugInfos, user, follow, unFollow }) => {

    const { slug } = useParams();

    const handdleClickFollow = () => {
        follow(userSlugInfos.id);
        console.log("user", user.id , "follow", "user", userSlugInfos.id);
    };

    return (
        <div className="follow">
            {/* 
            Visite d'un autre profil : 
                Si l'utilisateur courant a dans sa liste de suivis userSlugInfos.id 
                ALORS 
                    on affiche UNFOLLOW 
                SINON 
                    on affiche FOLLOW  
            */}
            { user.id && slug !== user.slug && 
                <Button color='red' size="mini" onClick={handdleClickFollow}>
                    Follow
                </Button>
            }
        </div>
    );
};

export default Follow;