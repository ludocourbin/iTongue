/* Reducer Expressions */

/* Actions */
import { 
    SET_FAKE_DATA,
    ADD_EXPRESSION_SUBMIT,
    ADD_EXPRESSION_SUBMIT_SUCCESS,
    ADD_EXPRESSION_SUBMIT_ERROR,
    ADD_EXPRESSION_INPUT_VALUE,

    DELETE_EXPRESSION_SUCCESS,
    DELETE_EXPRESSION_ERROR,

    EXPRESSION_ID_SELECT,

    ADD_TRADUCTION_SUBMIT,
    ADD_TRADUCTION_SUBMIT_SUCCESS,
    ADD_TRADUCTION_SUBMIT_ERROR,
    ADD_TRADUCTION_INPUT_VALUE,
    SET_TRADUCTIONS_BY_EXPRESSION_SUCCESS,

    DELETE_TRADUCTION_SUCCESS,
 } from '../../actions/Admin/expressionsActions';

/* State */
const initialState = {
    newExpressionInputValue: '',
    newExpressionLoading: false,
    expressionsList: [],
    traductionsList: [],
    expressionId: 0,

    newTraductionInputValue: {
        traduction: '',
        langue: '',
    },
    newTraductionLoading: false,
};

export default (state = initialState, action = {}) => {

    switch (action.type) {
        case SET_FAKE_DATA: 
            return {
                ...state,
                expressionsList: [
                    ...action.payload
                ],
                notifyMsg: 'Les données ont bien été chargées'
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
        case DELETE_EXPRESSION_SUCCESS : 
            return {
                ...state,
                expressionsList: [...action.payload],
            };
        case SET_TRADUCTIONS_BY_EXPRESSION_SUCCESS: 
            return {
                ...state,
                traductionsList: [...action.payload],
            };
        case EXPRESSION_ID_SELECT:
            return {
                ...state,
                expressionId: action.payload,
            };
        case ADD_TRADUCTION_SUBMIT: 
            return {
                ...state,
                newTraductionLoading: true,
            };
        case ADD_TRADUCTION_SUBMIT_SUCCESS: 
            return {
                ...state,
                newTraductionLoading: false,
                expressionsList: [...action.payload]
            };
        case ADD_TRADUCTION_SUBMIT_ERROR: 
            return {
                ...state,
                newTraductionLoading: false,
            };
        case ADD_TRADUCTION_INPUT_VALUE: 
            return {
                ...state,
                newTraductionInputValue: { 
                    ...state.newTraductionInputValue,
                    ...action.payload,
                },
            };
        case DELETE_TRADUCTION_SUCCESS :
            return {
                ...state,
                expressionsList: [...action.payload],
            };
        default:
            return state;
    };
};