import { connect } from "react-redux";
import Conversations from "../../components/Chat/Conversations";
import { 
    socketSetRecipient,
    fetchAllThreads,
    emptyAllThreads
} from "../../store/actions/chatActions";

const mapStateToProps = (state) => ({
    allThreads: state.chatReducer.allThreads,
    allThreadsLoading: state.chatReducer.allThreadsLoading,
    unreadCount: state.chatReducer.unreadCount,
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
    socketSetRecipient: recipientObj => {
        dispatch(socketSetRecipient(recipientObj));
    },
    fetchAllThreads: () => {
        dispatch(fetchAllThreads());
    },
    emptyAllThreads: () => {
        dispatch(emptyAllThreads());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
