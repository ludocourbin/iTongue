import { connect } from "react-redux";

/* Component */
import Signup from "../components/Signup";

/* Action */
import {
    signupInputChange,
    setErrorMessage,
} from "../store/Actions/userActions";

const mapStateToProps = (state) => ({
    signupData: state.user.signupData,
    errorMessage: state.user.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
    onInputChange: (changedData) => {
        dispatch(signupInputChange(changedData));
    },
    setErrorMessage: (errorMessage) => {
        dispatch(setErrorMessage(errorMessage));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
