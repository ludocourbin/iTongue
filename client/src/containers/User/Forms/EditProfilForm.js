import { connect } from "react-redux";

/* Component */
import EditProfilForm from "../../../components/User/EditProfil/Forms/editProfilForm";

/* Actions */
import { editProfilAvatar } from '../../../store/actions/editProfilActions';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
    editProfilAvatar: (avatarFile) => {
        dispatch(editProfilAvatar(avatarFile));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilForm);