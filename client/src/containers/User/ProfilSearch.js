import { connect } from "react-redux";
import ProfilSearch from "../../components/User/Profil/profilSearch";
import { setRecordsBySearch, getRecordsBySearch } from '../../store/actions/profilSearchActions';
import { fetchAllLanguages } from '../../store/actions/languagesAction';

const mapStateToProps = (state) => ({
    recordsFiltered: state.user.recordsFiltered,
    allLanguagesList: state.languagesReducer.allLanguagesList,
});

const mapDispatchToProps = (dispatch) => ({
    setRecordsBySearch: (recordsFiltered) => {
        dispatch(setRecordsBySearch(recordsFiltered));
    },
    getRecordsBySearch: () => {
        dispatch(getRecordsBySearch());
    },
    fetchAllLanguages: () => {
        dispatch(fetchAllLanguages());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilSearch);