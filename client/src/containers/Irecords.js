import { connect } from "react-redux";

import Irecords from "../components/Irecords";

import {
    setIrecordSelectedId,
    toggleRecording,
    selectIrecordToRecord,
    setTranslationId,
} from "../store/actions/irecordsActions";

const mapStateToProps = (state) => ({
    irecordSelectedId: state.irecords.irecordSelectedId,
    isRecording: state.irecords.isRecording,
    isLogged: state.user.isLogged,
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setIrecordSelectedId: (id) => {
        dispatch(setIrecordSelectedId(id));
    },
    setTranslationId: (id) => {
        dispatch(setTranslationId(id));
    },
    toggleRecording: (bool) => {
        dispatch(toggleRecording(bool));
    },
    selectIrecordToRecord: (irecord) => {
        dispatch(selectIrecordToRecord(irecord));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Irecords);
