
import { connect } from 'react-redux';
import { loginSubmit, loginInputValue } from '../../store/actions/Admin/loginAdminActions';
import LoginAdmin from '../../components/Admin/LoginAdmin';

const mapStateToProps = (state) => ({
    loginData: state.loginAdminReducer.loginData,
    loading: state.loginAdminReducer.loading,
    message: state.loginAdminReducer.message,
});

const mapDispatchToProps = (dispatch) => ({
    loginSubmit: () => {
        dispatch(loginSubmit());
    },
    loginInputValue: (objValue) => {
        dispatch(loginInputValue(objValue));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginAdmin);