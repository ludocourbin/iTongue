import { connect } from "react-redux";
import Feed from "../components/Feed";
import { fetchAllRecords } from "../store/actions/irecordsActions";
import { fetchFeedUser } from "../store/actions/feedActions";

const mapStateToProps = (state) => ({
    feedUser: state.user.feedUser,
});

const mapDispatchToProps = (dispatch) => ({
    fetchFeedUser: () => {
        dispatch(fetchFeedUser());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
