import React, { useState,useEffect } from 'react';
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
        updateCommentInput,
        commentEditInputValue,
        commentInputValue, 
        commentSubmitLoading, 
        setRecordIdComment, // redux
        iRecordCommentIdSelect, // store
    } = props;

    const [showComments, setShowComments] = useState(false);
    const [commentEditId, setCommentEditId] = useState(0);
    const [commentEditStatus, setCommentEditStatus] = useState(false);
    const [deleteCommentId, setDeleteCommentId] = useState(0);
    const [confirm, setConfirm] = useState(false);

    const handdleInputChange = (e) => {
        commentInput(e.target.value);
    };

    const handdleEditInputChange = (e) => {
        updateCommentInput(e.target.value);
    };

    const handdleSubmit = (e) => {
        commentSubmit(record.id);
    };

    const handdleEditSubmit = (e, commentId) => {
        updateComment(commentId);
        setCommentEditStatus(false);
    };

    const handdleDeleteComment = () => {
        setConfirm(false);
        deleteComment(deleteCommentId);
    };

    const handleShowComments = () => {
        setShowComments(!showComments)
        fetchCommentsByRecord(record.id);
        setRecordIdComment(record.id);
    };

    useEffect(() => {
        if (iRecordCommentIdSelect !== record.id) {
            setShowComments(false);
            commentInput("");
        }
    }, [iRecordCommentIdSelect, record.id]);

    return (
        <div className="social">
            <div className="social-interraction">
                <div className="social-nbrlike">
                    <Icon name="thumbs up" />
                    {record && record.likeCount}
                </div>
                <div className="social-nbrcomment" onClick={handleShowComments}>
                    {/* <Icon name="comments" /> */}
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
                                    updateCommentInput(comment.text)
                                    setCommentEditStatus(!commentEditStatus);
                                }}/>
                                <Icon name="delete" onClick={() => {
                                    setConfirm(true);
                                    setDeleteCommentId(comment.id);
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
                                { comment.id === commentEditId && commentEditStatus ? 
                                <Form onSubmit={(e) => handdleEditSubmit(e, comment.id)}>
                                    <TextArea 
                                    value={commentEditInputValue}
                                    onChange={handdleEditInputChange}
                                    type="text" 
                                    size="mini" 
                                    placeholder="Nouveau commentaire.."
                                    spellCheck={false} 
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handdleEditSubmit(e, comment.id);
                                            e.preventDefault();
                                        }
                                    }}
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