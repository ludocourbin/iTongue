import React, { useState } from 'react';
import { Icon, Image, Transition, Form, TextArea, Confirm } from "semantic-ui-react";
import './comments.scss';
import { Link } from 'react-router-dom';

const Comments = (props) => {

    const { 
        user, 
        record,
        commentsList,
        fetchCommentsByRecord,
        commentInput, 
        commentSubmit, 
        deleteComment, 
        updateComment, 
        commentInputValue, 
        commentSubmitLoading, 
    } = props;

    const [showComments, setShowComments] = useState(false);
    const [commentEditId, setCommentEditId] = useState(0);
    const [commentEditStatus, setCommentEditStatus] = useState(false);
    const [deleteCommentId, setDeleteCommentId] = useState(0);
    const [confirm, setConfirm] = useState(false); // true || false

    const handdleInputChange = (e) => {
        commentInput(e.target.value);
    };

    const handdleSubmit = (e) => {
        commentSubmit(record.id);
        console.log("record.id", record.id);
    };

    const handdleDeleteComment = () => {
        setConfirm(false);
        deleteComment(deleteCommentId);
    };

    return (
        <div className="social">
            <div className="social-interraction">
                <div className="social-nbrlike">
                    <Icon name="thumbs up" />
                    {record && record.likeCount}
                </div>
                <div className="social-nbrcomment" onClick={() => {
                    fetchCommentsByRecord(record.id);
                    setShowComments(!showComments);
                }}>
                    <Icon name="comments" />
                    {record && record.commentCount} comments
                </div>
            </div>
            <Transition visible={showComments} animation='fade' duration={500}>
           
                <div className="social-comments">
                { showComments &&
                    <Form onSubmit={handdleSubmit}>
                        <TextArea 
                        value={commentInputValue}
                        onChange={handdleInputChange}
                        type="text" 
                        size="mini" 
                        placeholder="Nouveau commentaire.."
                        rows="1.5"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handdleSubmit();
                                e.preventDefault();
                            }
                        }}
                        />
                    </Form>
                }

                { showComments && commentsList && commentsList.map(comment => (

                    <div className="social-comment" key={comment.id}>
                        <div className="social-comment_containerLeft">
                            <Link to={`/user/${comment.user.slug}`}>
                                <Image
                                className="social-comment_avatar"
                                avatar
                                size="large"
                                src={
                                    comment.user.avatarUrl == null
                                    ? "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
                                    : `${process.env.REACT_APP_FILES_URL}/${comment.user.avatarUrl}`
                                }
                                />
                            </Link>
                            <div className="social-comment_actions">
                                <Icon name={commentEditStatus ? "undo" : "edit"} onClick={() => {
                                    setCommentEditId(comment.id);
                                    setCommentEditStatus(!commentEditStatus);
                                }}/>
                                <Icon name="delete" onClick={() => {
                                    setConfirm(true);
                                    setDeleteCommentId(5);
                                }} />
                                <Confirm
                                open={confirm}
                                onCancel={() => setConfirm(false)}
                                onConfirm={handdleDeleteComment}
                                content="Vous souhaitez vraiment supprimer votre commentaire ?"
                                size="tiny"
                                />
                            </div>
                        </div>
                        <div className="social-comment_containerRight">
                            <div className="social-comment_wrapper">
                                <div className="social-comment_name">{comment.user.firstname} {comment.user.lastname}</div>
                                <div className="social-comment_date">45min</div>
                            </div>
                            <div className="social-comment_text">
                                {/*  */}
                                { comment.id === commentEditId && commentEditStatus ? 
                                <Form onSubmit={handdleSubmit}>
                                    <TextArea 
                                    value={comment.text}
                                    //onChange={handdleInputChange}
                                    //loading={commentSubmitLoading}
                                    type="text" 
                                    size="mini" 
                                    placeholder="Nouveau commentaire.."
                                    spellCheck={false} 
                                    //readOnly={false}
                                    />
                                </Form>
                                :
                                    comment.text
                                }
                            </div>

                        </div>
                    </div>
                    ))}
                </div>
            </Transition>
        </div>
    );
};

export default Comments;