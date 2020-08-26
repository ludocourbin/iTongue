import { connect } from "react-redux";
import Feed from "../components/Feed";
import { fetchAllRecords } from "../store/actions/irecordsActions";

const mapStateToProps = (state) => ({
    allRecordsList: state.irecords.allRecordsList,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllRecords: () => {
        dispatch(fetchAllRecords());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);