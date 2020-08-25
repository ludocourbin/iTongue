
import { connect } from 'react-redux';
import { logout } from '../../store/actions/Admin/loginAdminActions';
import HeaderAdmin from '../../components/Admin/HeaderAdmin';

const mapStateToProps = (state) => ({
    userConnect: state.loginAdminReducer.userConnect,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(logout());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin);