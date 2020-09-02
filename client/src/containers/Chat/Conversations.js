import { connect } from "react-redux";
import Conversations from "../../components/Chat/Conversations";
import { 
    socketSetRecipientId,
    fetchAllThreads,
} from "../../store/actions/chatActions";

const mapStateToProps = (state) => ({
    allThreads: state.chatReducer.allThreads,
});

const mapDispatchToProps = dispatch => ({
    socketSetRecipientId: recipientId => {
        dispatch(socketSetRecipientId(recipientId));
    },
    fetchAllThreads: () => {
        dispatch(fetchAllThreads());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
