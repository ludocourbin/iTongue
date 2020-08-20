import { connect } from "react-redux";

/* Component */
import Layout from "../components/Layout";

/* Actions */
import { toggleMenu } from "../store/actions/settingsActions";
import { logout } from "../store/actions/userActions";
import {
    toggleRecording,
    sendIrecordsRecorded,
} from "../store/actions/irecordsActions";

const mapStateToProps = (state) => ({
    visible: state.settings.visible,
    user: state.user.currentUser,
    recording: state.irecords.recording,
    isRecording: state.irecords.isRecording,
    loading: state.irecords.loading,
});

const mapDispatchToProps = (dispatch) => ({
    setVisible: () => {
        dispatch(toggleMenu());
    },
    logout: () => {
        dispatch(logout());
    },
    toggleRecording: (value) => {
        dispatch(toggleRecording(value));
    },
    sendIrecordsRecorded: (blob) => {
        dispatch(sendIrecordsRecorded(blob));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
