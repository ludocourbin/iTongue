import { connect } from "react-redux";
import Comments from "../components/Irecords/Comments";
import { commentInput, commentSubmit, deleteComment, updateComment } from '../store/actions/commentActions';

const mapStateToProps = (state) => ({
    commentInputValue: state.irecords.commentInputValue,
    commentSubmitLoading: state.irecords.commentSubmitLoading,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);