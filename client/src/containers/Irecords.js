import { connect } from "react-redux";

import Irecords from "../components/Irecords";

import {
    setIrecordSelectedId,
    toggleRecording,
    selectIrecordToRecord,
} from "../store/actions/irecordsActions";

const mapStateToProps = (state) => ({
    irecordSelectedId: state.irecords.irecordSelectedId,
    isRecording: state.irecords.isRecording,
    //user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setIrecordSelectedId: (id) => {
        dispatch(setIrecordSelectedId(id));
    },
    toggleRecording: (bool) => {
        dispatch(toggleRecording(bool));
    },
    selectIrecordToRecord: (irecord) => {
        dispatch(selectIrecordToRecord(irecord));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Irecords);
