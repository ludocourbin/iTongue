import { connect } from "react-redux";

import App from "../components/App";

const mapStateToProps = state => ({
    user: state.user.currentUser,
    isLogged: state.user.isLogged
});

export default connect(mapStateToProps)(App);
