import { connect } from "react-redux";

/* Component */
import Header from "../components/Header";

/* Actions */
import { toggleMenu } from "../store/actions/settingsActions";

const mapStateToProps = state => ({
    visible: state.settings.visible,
    user: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setVisible: () => {
        dispatch(toggleMenu());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
