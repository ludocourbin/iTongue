import { connect } from "react-redux";

/* Component */
import EditProfilForm from "../../../components/User/EditProfil/Forms/editProfilForm";

/* Actions */
import { fetchAllLanguages } from '../../../store/actions/languagesAction';
import { editProfilAvatar } from '../../../store/actions/editProfilActions';

const mapStateToProps = (state) => ({
    allLanguagesList: state.languagesReducer.allLanguagesList,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllLanguages: () => {
        dispatch(fetchAllLanguages());
    },
    editProfilAvatar: (avatarFile) => {
        dispatch(editProfilAvatar(avatarFile));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilForm);