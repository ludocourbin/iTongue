import { connect } from "react-redux";

/* Component */
import Login from "../components/Login";

/* Action */
import {
    loginInputChange,
    loginSubmitSuccess,
    loginSubmitError,
    login,
    togglePassword,
} from "../store/actions/loginActions";

const mapStateToProps = state => ({
    loginData: state.login.loginData,
    loginErrorMessage: state.login.loginErrorMessage,
    loading: state.login.loading,
    showPassword: state.login.showPassword,
});

const mapDispatchToProps = dispatch => ({
    onInputChange: changedData => {
        dispatch(loginInputChange(changedData));
    },
    loginSubmitError: errorMessage => {
        dispatch(loginSubmitError(errorMessage));
    },
    loginSubmitSuccess: successMessage => {
        dispatch(loginSubmitSuccess(successMessage));
    },
    togglePassword: () => {
        dispatch(togglePassword());
    },
    login: () => {
        dispatch(login());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);