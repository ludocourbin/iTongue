/* Container ExpressionsList */

import { connect } from 'react-redux';

/* Component */
import ExpressionResult from '../../../components/Admin/Expressions/expressionsResult';

const mapStateToProps = (state) => ({
    traductionsList: state.expressionsReducer.traductionsList,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ExpressionResult);