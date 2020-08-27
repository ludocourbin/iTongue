import { connect } from "react-redux";

/* Component */
import Team from "../../components/Team";

/* Actions */
import {
    toggleModal,
    changeId,
} from "../../store/actions/modalActions";

const mapStateToProps = (state) => ({
    visible: state.team.visible,
    idAvatar : state.team.idAvatar
});

const mapDispatchToProps = (dispatch) => ({
    toggleModal: () => {
        dispatch(toggleModal());
    },
    changeId: (changedId) => {
        dispatch(changeId(changedId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);