/* Container ExpressionsList */

import { connect } from 'react-redux';

import { 
    addTraductionInputValue, 
    addTraductionSubmit,
    deleteTraduction,
    editTraductionInputValue,
    editTraductionSubmit,
} from '../../../store/actions/Admin/expressionsActions';

/* Component */
import ExpressionResult from '../../../components/Admin/Expressions/expressionsResult';

const mapStateToProps = (state) => ({
    traductionsList: state.expressionsReducer.traductionsList,
    newTraductionInputValue: state.expressionsReducer.newTraductionInputValue,
    expressionId: state.expressionsReducer.expressionId,
    editTraductionValue: state.expressionsReducer.editTraductionValue,
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
    editTraductionInputValue: (objInput) => {
        dispatch(editTraductionInputValue(objInput));
    },
    editTraductionSubmit: () => {
        dispatch(editTraductionSubmit());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpressionResult);