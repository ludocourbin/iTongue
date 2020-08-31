import { connect } from "react-redux";
import Comments from "../components/Irecords/Comments";
import { commentInput, commentSubmit, deleteComment } from '../store/actions/commentActions';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    commentInput: (inputValue) => {
        dispatch(commentInput(inputValue));
    },
    commentSubmit: () => {
        dispatch(commentSubmit());
    },
    deleteComment: (commentId) => {
        dispatch(deleteComment(commentId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);