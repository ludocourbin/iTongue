import { connect } from "react-redux";
import Profil from "../../components/User/Profil";

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
    isLogged: state.user.isLogged,
});

export default connect(mapStateToProps)(Profil);
