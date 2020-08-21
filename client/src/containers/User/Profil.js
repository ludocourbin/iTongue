import { connect } from "react-redux";
import Profil from "../../components/User/Profil";
import { fetchAllUsers } from '../../store/actions/userActions';

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    isLogged: state.user.isLogged,
    allUsersList: state.user.allUsersList,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllUsers: () => {
        dispatch(fetchAllUsers());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
