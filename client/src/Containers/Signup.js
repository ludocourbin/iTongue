import { connect } from "react-redux";

/* Component */
import Signup from "../components/Signup";

/* Action */
import { signupInputChange } from "../store/Actions/userActions";

const mapStateToProps = (state) => ({
    signupData: state.user.signupData,
});

const mapDispatchToProps = (dispatch) => ({
    onInputChange: (changedData) => {
        dispatch(signupInputChange(changedData));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
