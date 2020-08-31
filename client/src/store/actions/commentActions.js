export const COMMENT_SUBMIT = "COMMENT_SUBMIT";
export const COMMENT_SUBMIT_SUCCESS = "COMMENT_SUBMIT_SUCCESS";
export const COMMENT_SUBMIT_ERROR = "COMMENT_SUBMIT_ERROR";
export const COMMENT_INPUT = "COMMENT_INPUT";

export const commentSubmit = () => ({
    type: COMMENT_SUBMIT,
});

export const commentSubmitSuccess = (payload) => ({
    type: COMMENT_SUBMIT_SUCCESS,
    payload,
});

export const commentSubmitError = (payload) => ({
    type: COMMENT_SUBMIT_ERROR,
    payload,
});

export const commentInput = (payload) => ({
    type: COMMENT_INPUT,
    payload,
});

export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_ERROR = "DELETE_COMMENT_ERROR";

export const deleteComment = () => ({
    type: DELETE_COMMENT,
});

export const deleteCommentSuccess = (payload) => ({
    type: DELETE_COMMENT_SUCCESS,
    payload,
});

export const deleteCommentError = (payload) => ({
    type: DELETE_COMMENT_ERROR,
    payload,
});