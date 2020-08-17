
import { connect } from 'react-redux';
import Index from '../../components/Admin/index';

const mapStateToProps = (state) => ({
    isLogged: state.loginAdminReducer.isLogged,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Index);