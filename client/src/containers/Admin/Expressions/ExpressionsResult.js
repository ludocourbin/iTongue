/* Container ExpressionsList */

import { connect } from 'react-redux';

import { 
    addTraductionInputValue, 
    addTraductionSubmit,
    deleteTraduction,
} from '../../../store/actions/Admin/expressionsActions';

/* Component */
import ExpressionResult from '../../../components/Admin/Expressions/expressionsResult';

const mapStateToProps = (state) => ({
    traductionsList: state.expressionsReducer.traductionsList,
    newTraductionInputValue: state.expressionsReducer.newTraductionInputValue,
    expressionId: state.expressionsReducer.expressionId,
});

const mapDispatchToProps = (dispatch) => ({
    addTraductionInputValue: (inputValue) => {
        dispatch(addTraductionInputValue(inputValue));
    },
    addTraductionSubmit: () => {
        dispatch(addTraductionSubmit());
    },
    deleteTraduction: (tradId) => {
        dispatch(deleteTraduction(tradId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpressionResult);