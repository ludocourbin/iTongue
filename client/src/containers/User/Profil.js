import { connect } from "react-redux";
import Profil from "../../components/User/Profil";

const mapStateToProps = (state) => ({
    user: state.login.currentUser,
    isLogged: state.login.isLogged,
});

export default connect(mapStateToProps)(Profil);
