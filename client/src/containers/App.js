import { connect } from "react-redux";

import App from "../components/App";
import { setCaptchaToken } from "../store/actions/settingsActions";

const mapStateToProps = state => ({
  user: state.user.currentUser,
  isLogged: state.user.isLogged
});

const mapDispatchToProps = dispatch => ({
  setCaptchaToken: token => {
    dispatch(setCaptchaToken(token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
