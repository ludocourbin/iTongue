
import { connect } from 'react-redux';
import { logout } from '../../store/actions/Admin/loginAdminActions';
import HeaderAdmin from '../../components/Admin/HeaderAdmin';

const mapStateToProps = (state) => ({
    currentUser: state.loginAdminReducer.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(logout());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin);