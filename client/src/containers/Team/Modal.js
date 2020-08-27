import { connect } from "react-redux";

/* Component */
import Modal from "../../components/Team/modal";

/* Action */
import {
    toggleModal,
} from "../../store/actions/modalActions";

const mapStateToProps = (state) => ({
    visible: state.team.visible,
    idAvatar : state.team.idAvatar
});

const mapDispatchToProps = (dispatch) => ({
    toggleModal: () => {
        dispatch(toggleModal());
    },  
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);