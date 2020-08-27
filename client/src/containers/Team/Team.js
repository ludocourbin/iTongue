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
});

const mapDispatchToProps = (dispatch) => ({
    toggleModal: () => {
        dispatch(toggleModal());
    },
    changeId: (newId) => {
        dispatch(changeId(newId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);