import { connect } from "react-redux";

/* Component */
import Layout from "../components/Layout";

/* Actions */
import { toggleMenu } from "../store/actions/settingsActions";
import { logout } from "../store/actions/userActions";

const mapStateToProps = (state) => ({
    visible: state.settings.visible,
    user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setVisible: () => {
        dispatch(toggleMenu());
    },
    logout: () => {
        dispatch(logout());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
