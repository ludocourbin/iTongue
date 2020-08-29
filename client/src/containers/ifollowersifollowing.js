import { connect } from "react-redux";
import IfollowersiFollowing from "../components/IfollowersiFollowing";
import {
    fetchIfollowers,
    fetchIfollowing,
} from "../store/actions/ifollowersifollowingActions";

const mapStateToProps = (state) => ({
    allFollowers: state.ifollowersifollowing.allFollowers,
    allFollowing: state.ifollowersifollowing.allFollowing,
    isLoadingAllFollowers: state.ifollowersifollowing.isLoadingAllFollowers,
    isLoadingAllFollowing: state.ifollowersifollowing.isLoadingAllFollowing,
});

const mapDispatchToProps = (dispatch) => ({
    fetchIfollowers: () => {
        dispatch(fetchIfollowers());
    },
    fetchIfollowing: () => {
        dispatch(fetchIfollowing());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(IfollowersiFollowing);
