import { connect } from "react-redux";
import IfollowersiFollowing from "../components/IfollowersiFollowing";
import {
    fetchIfollowers,
    fetchIfollowing,
    setSelectedUserToFetchSubscriptions,
} from "../store/actions/ifollowersifollowingActions";

import {
    followIfollowersPage,
    unfollowIfollowersPage,
} from "../store/actions/ifollowersifollowingActions";

const mapStateToProps = (state) => ({
    allFollowers: state.ifollowersifollowing.allFollowers,
    allFollowing: state.ifollowersifollowing.allFollowing,
    isLoadingAllFollowers: state.ifollowersifollowing.isLoadingAllFollowers,
    isLoadingAllFollowing: state.ifollowersifollowing.isLoadingAllFollowing,
    currentUser: state.user.currentUser,
    userSlugInfos: state.user.userSlugInfos,
    selectedUserToFetchSubscriptions:
        state.ifollowersifollowing.selectedUserIdToFetchSubscriptions,
});

const mapDispatchToProps = (dispatch) => ({
    fetchIfollowers: () => {
        dispatch(fetchIfollowers());
    },
    fetchIfollowing: () => {
        dispatch(fetchIfollowing());
    },
    setSelectedUserToFetchSubscriptions: (objEmpty) => {
        dispatch(setSelectedUserToFetchSubscriptions(objEmpty));
    },

    followIfollowersPage: (userObj) => {
        dispatch(followIfollowersPage(userObj));
    },
    unfollowIfollowersPage: (userObj) => {
        dispatch(unfollowIfollowersPage(userObj));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(IfollowersiFollowing);
