/* Container ExpressionsList */

import { connect } from 'react-redux';

/* Component */
import ExpressionsList from '../../../components/Admin/Expressions/expressionsList';

/* Actions */
import { 
    addExpressionInputValue, 
    addExpressionSubmit,
    getFakeData,
    setTraductionsByExpression,
} from '../../../store/actions/Admin/expressionsActions';


const mapStateToProps = (state) => ({
    newExpressionInputValue: state.expressionsReducer.newExpressionInputValue,
    newExpressionLoading: state.expressionsReducer.newExpressionLoading,
    expressionsList: state.expressionsReducer.expressionsList,
});

const mapDispatchToProps = (dispatch) => ({
    addExpressionInputValue: (newInputValue) => {
        dispatch(addExpressionInputValue(newInputValue));
    },
    addExpressionSubmit: () => {
        dispatch(addExpressionSubmit());
    },
    getFakeData: (fakeData) => {
        dispatch(getFakeData(fakeData));
    },
    setTraductionsByExpression: (traductionsList) => {
        dispatch(setTraductionsByExpression(traductionsList));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpressionsList);