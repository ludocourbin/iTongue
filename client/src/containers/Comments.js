import { connect } from "react-redux";
import Comments from "../components/Irecords/Comments";
import { commentInput, commentSubmit, deleteComment, updateComment, fetchCommentsByRecord } from '../store/actions/commentActions';

const mapStateToProps = (state) => ({
    commentInputValue: state.irecords.commentInputValue,
    commentSubmitLoading: state.irecords.commentSubmitLoading,
    commentsList: state.irecords.commentsList,
});

const mapDispatchToProps = (dispatch) => ({
    commentInput: (inputValue) => {
        dispatch(commentInput(inputValue));
    },
    commentSubmit: (recordId) => {
        dispatch(commentSubmit(recordId));
    },
    deleteComment: (commentId) => {
        dispatch(deleteComment(commentId));
    },
    updateComment: (comment) => {
        dispatch(updateComment(comment));
    },
    fetchCommentsByRecord: (recordId) => {
        dispatch(fetchCommentsByRecord(recordId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);