import { connect } from "react-redux";
import IrecordsPage from "../components/IrecordsPage";
import { fetchAllRecords } from '../store/actions/irecordsActions';

import {

} from "../store/actions/irecordsActions";

const mapStateToProps = (state) => ({
    isLoadingAllRecords: state.irecords.isLoadingAllRecords,
    allRecordsList: state.irecords.allRecordsList,
    recordsListError: state.irecords.recordsListError,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllRecords: () => {
        dispatch(fetchAllRecords());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(IrecordsPage);
