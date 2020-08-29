import { connect } from "react-redux";
import Profil from "../../components/User/Profil";
import { fetchAllUsers, checkUserSlug } from '../../store/actions/userActions';
import { editProfilAvatar } from '../../store/actions/editProfilActions';
import { getRecordsBySearch } from '../../store/actions/profilSearchActions';

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    isLogged: state.user.isLogged,
    allUsersList: state.user.allUsersList,
    isLoadingallUsers: state.user.isLoadingallUsers,
    userSlugInfos: state.user.userSlugInfos,
    checkUserSlugLoading: state.user.checkUserSlugLoading,
    recordsFiltered: state.user.recordsFiltered,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllUsers: () => {
        dispatch(fetchAllUsers());
    },
    editProfilAvatar: (avatarFile) => {
        dispatch(editProfilAvatar(avatarFile));
    },
    checkUserSlug: (slug) => {
        dispatch(checkUserSlug(slug));
    },
    getRecordsBySearch: () => {
        dispatch(getRecordsBySearch());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profil);