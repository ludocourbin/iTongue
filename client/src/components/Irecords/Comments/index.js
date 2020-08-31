import React, { useState } from 'react';
import { Icon, Image, Input, Transition } from "semantic-ui-react";
import './comments.scss';

const Comments = ({ user }) => {

    const [showComments, setShowComments] = useState(false);

    return (
        <div className="social">
            <div className="social-interraction">
                <div className="social-nbrlike">
                    <Icon name="thumbs up" />
                    15
                </div>
                <div className="social-nbrcomment" onClick={() => setShowComments(!showComments)}>
                    <Icon name="comments" />
                    6 comments
                </div>
            </div>
            <Transition visible={showComments} animation='fade' duration={500}>
                <div className="social-comments">
                    <Input type="text" fluid size="mini" placeholder="Nouveau commentaire.."/>
                    <div className="social-comment">
                        <div className="social-comment_containerLeft">
                            <Image
                            className="social-comment_avatar"
                            avatar
                            size="large"
                            src={
                                user.avatarUrl == null
                                ? "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
                                : `${process.env.REACT_APP_FILES_URL}/${user.avatarUrl}`
                            }
                            />
                        </div>
                        <div className="social-comment_containerRight">
                            <div className="social-comment_wrapper">
                                <div className="social-comment_name">Gautier Colasse</div>
                                <div className="social-comment_date">45min</div>
                            </div>
                            <div className="social-comment_text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptate laudantium quos quis, animi aut.
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default Comments;