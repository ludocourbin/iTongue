/* Reducer Expressions */

/* Actions */
import { 
    SET_FAKE_DATA,
    ADD_EXPRESSION_SUBMIT,
    ADD_EXPRESSION_SUBMIT_SUCCESS,
    ADD_EXPRESSION_SUBMIT_ERROR,
    ADD_EXPRESSION_INPUT_VALUE,
    SET_TRADUCTIONS_BY_EXPRESSION,
 } from '../../actions/Admin/expressionsActions';

/* State */
const initialState = {
    newExpressionInputValue: '',
    newExpressionLoading: false,
    expressionsList: [],
    traductionsList: [],
};

export default (state = initialState, action = {}) => {

    switch (action.type) {
        case SET_FAKE_DATA: 
            return {
                ...state,
                expressionsList: [
                    ...action.payload
                ],
            };
        case ADD_EXPRESSION_SUBMIT:
            return {
                ...state,
                newExpressionLoading: true,
            };
        case ADD_EXPRESSION_SUBMIT_SUCCESS:
            return {
                ...state,
                newExpressionLoading: false,
                expressionsList: [
                    ...state.expressionsList,
                    {...action.payload},
                ],
                newExpressionInputValue: '',
            };   
        case ADD_EXPRESSION_SUBMIT_ERROR:
            return {
                ...state,
                newExpressionLoading: false,
            };
        case ADD_EXPRESSION_INPUT_VALUE:
            return {
                ...state,
                newExpressionInputValue: action.payload,
            };
        case SET_TRADUCTIONS_BY_EXPRESSION: 
            return {
                ...state,
                traductionsList: [...action.payload],
            }
        default:
            return state;
    };
};