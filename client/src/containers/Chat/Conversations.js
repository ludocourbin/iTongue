import { connect } from "react-redux";
import Conversations from "../../components/Chat/Conversations";
import { 
    socketSetRecipient,
    fetchAllThreads,
} from "../../store/actions/chatActions";

const mapStateToProps = (state) => ({
    allThreads: state.chatReducer.allThreads,
});

const mapDispatchToProps = dispatch => ({
    socketSetRecipient: recipientObj => {
        dispatch(socketSetRecipient(recipientObj));
    },
    fetchAllThreads: () => {
        dispatch(fetchAllThreads());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
