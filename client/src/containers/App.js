import { connect } from "react-redux";

import App from "../components/App";

const mapStateToProps = state => ({
    userSignup: state.user.currentUser,
    userLogin: state.login.currentUser,
    isLogged: state.login.isLogged
});

export default connect(mapStateToProps)(App);
