import { connect } from "react-redux";
import IfollowersiFollowing from "../components/IfollowersiFollowing";
import {
    fetchIfollowers,
    fetchIfollowing,
} from "../store/actions/ifollowersifollowingActions";

import { follow, unFollow, checkIfUserFollow } from "../store/actions/followActions";

const mapStateToProps = (state) => ({
    allFollowers: state.ifollowersifollowing.allFollowers,
    allFollowing: state.ifollowersifollowing.allFollowing,
    isLoadingAllFollowers: state.ifollowersifollowing.isLoadingAllFollowers,
    isLoadingAllFollowing: state.ifollowersifollowing.isLoadingAllFollowing,
    currentUser: state.user.currentUser,
    userSlugInfos: state.user.userSlugInfos,
});

const mapDispatchToProps = (dispatch) => ({
    fetchIfollowers: () => {
        dispatch(fetchIfollowers());
    },
    fetchIfollowing: () => {
        dispatch(fetchIfollowing());
    },
    follow: (userId) => {
        dispatch(follow(userId));
    },
    unFollow: (userId) => {
        dispatch(unFollow(userId));
    },
    checkIfUserFollow: (userSlug) => {
        dispatch(checkIfUserFollow(userSlug));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(IfollowersiFollowing);
