import { connect } from "react-redux";

/* Component */
import Header from "../components/Header";

/* Actions */
import { toggleMenu } from "../store/Actions/settingsActions";

const mapStateToProps = (state) => ({
    visible: state.settings.visible,
});

const mapDispatchToProps = (dispatch) => ({
    setVisible: () => {
        dispatch(toggleMenu());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
