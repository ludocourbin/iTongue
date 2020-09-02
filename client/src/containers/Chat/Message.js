import { connect } from "react-redux";
import Message from "../../components/Chat/Message";
import { 
    socketEmitMessage, 
    socketEmitTyping, 
    socketSetRecipientId,
    fetchAllMessages,
    setMessageInAllMessages,
} from "../../store/actions/chatActions";

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    socketRecipientId: state.chatReducer.socketRecipientId,
    allMessages: state.chatReducer.allMessages,
});

const mapDispatchToProps = dispatch => ({
    socketEmitMessage: msgObj => {
        dispatch(socketEmitMessage(msgObj));
    },
    socketEmitTyping: typingObj => {
        dispatch(socketEmitTyping(typingObj));
    },
    socketSetRecipientId: recipientId => {
        dispatch(socketSetRecipientId(recipientId));
    },
    fetchAllMessages: () => {
        dispatch(fetchAllMessages());
    },
    setMessageInAllMessages: (messageObj) => {
        dispatch(setMessageInAllMessages(messageObj));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
