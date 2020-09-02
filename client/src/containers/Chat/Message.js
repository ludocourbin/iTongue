import { connect } from "react-redux";
import Message from "../../components/Chat/Message";
import { socketEmitMessage } from "../../store/actions/chatActions";

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
    socketEmitMessage: msgObj => {
    dispatch(socketEmitMessage(msgObj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
