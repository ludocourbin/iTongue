import { connect } from "react-redux";
import EditProfil from "../../components/User/EditProfil";
import { fetchAllLanguages } from '../../store/actions/languagesAction';
import { checkUserSlug } from '../../store/actions/userActions';
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
    editProfilInput: (inputData) => {
        dispatch(editProfilInput(inputData));
    },
    checkUserSlug: (slug) => {
        dispatch(checkUserSlug(slug));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfil);