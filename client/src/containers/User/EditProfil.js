import { connect } from "react-redux";
import EditProfil from "../../components/User/EditProfil";
import { fetchAllLanguages } from '../../store/actions/languagesAction';
import { editProfil, editProfilInput } from '../../store/actions/editProfilActions';

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    allLanguagesList: state.languagesReducer.allLanguagesList,
    editProfilData: state.user.editProfilData,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllLanguages: () => {
        dispatch(fetchAllLanguages());
    },
    editProfil: () => {
        dispatch(editProfil());
    },
    editProfilInput: () => {
        dispatch(editProfilInput());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfil);