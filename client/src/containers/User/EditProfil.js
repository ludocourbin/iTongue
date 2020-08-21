import { connect } from "react-redux";
import EditProfil from "../../components/User/EditProfil";
// import {  } from '../../store/actions/userActions';

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(EditProfil);