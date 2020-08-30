import { connect } from "react-redux";
import Follow from "../../components/User/Follow";
import { follow, unFollow } from '../../store/actions/followActions';

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    follow: (userId) => {
        dispatch(follow(userId));
    },
    unFollow: (userId) => {
        dispatch(follow(userId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Follow);