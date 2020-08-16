/* ADMIN EXPRESSIONS */

// Fake Data
export const GET_FAKE_DATA = "GET_FAKE_DATA";
export const SET_FAKE_DATA = "SET_FAKE_DATA";

export const getFakeData = () => ({
    type: GET_FAKE_DATA,
});

export const setFakeData = (payload) => ({
    type: SET_FAKE_DATA,
    payload,
});

// Add expression
export const ADD_EXPRESSION_SUBMIT = "ADD_EXPRESSION_SUBMIT";
export const ADD_EXPRESSION_SUBMIT_SUCCESS = "ADD_EXPRESSION_SUBMIT_SUCCESS";
export const ADD_EXPRESSION_SUBMIT_ERROR = "ADD_EXPRESSION_SUBMIT_ERROR";
export const ADD_EXPRESSION_INPUT_VALUE = "ADD_EXPRESSION_INPUT_VALUE";

export const addExpressionSubmit = () => ({
    type: ADD_EXPRESSION_SUBMIT,
});

export const addExpressionSubmitSuccess = (payload) => ({
    type: ADD_EXPRESSION_SUBMIT_SUCCESS,
    payload,
});

export const addExpressionSubmitError = (payload) => ({
    type: ADD_EXPRESSION_SUBMIT_ERROR,
    payload,
});

export const addExpressionInputValue = (payload) => ({
    type: ADD_EXPRESSION_INPUT_VALUE,
    payload,
});

// Edit expression
export const EDIT_EXPRESSION_SUBMIT = "EDIT_EXPRESSION_SUBMIT";
export const EDIT_EXPRESSION_SUBMIT_SUCCESS = "EDIT_EXPRESSION_SUBMIT_SUCCESS";
export const EDIT_EXPRESSION_SUBMIT_ERROR = "EDIT_EXPRESSION_SUBMIT_ERROR";
export const EDIT_EXPRESSION_INPUT_VALUE = "EDIT_EXPRESSION_INPUT_VALUE";

export const editExpressionSubmit = () => ({
    type: EDIT_EXPRESSION_SUBMIT,
});

export const editExpressionSubmitSuccess = (payload) => ({
    type: EDIT_EXPRESSION_SUBMIT_SUCCESS,
    payload,
});

export const editExpressionSubmitError = (payload) => ({
    type: EDIT_EXPRESSION_SUBMIT_ERROR,
    payload,
});

export const editExpressionInputValue = (payload) => ({
    type: EDIT_EXPRESSION_INPUT_VALUE,
    payload,
});


// Delete expression
export const DELETE_EXPRESSION = "DELETE_EXPRESSION";
export const DELETE_EXPRESSION_SUCCESS = "DELETE_EXPRESSION_SUCCESS";
export const DELETE_EXPRESSION_ERROR = "DELETE_EXPRESSION_ERROR";

export const deleteExpression = (payload) => ({
    type: DELETE_EXPRESSION,
    payload,
});

export const deleteExpressionSuccess = (payload) => ({
    type: DELETE_EXPRESSION_SUCCESS,
    payload,
});

export const deleteExpressionError = (payload) => ({
    type: DELETE_EXPRESSION_ERROR,
    payload,
});

/* Traductions  */
export const SET_TRADUCTIONS_BY_EXPRESSION = "SET_TRADUCTIONS_BY_EXPRESSION";

export const setTraductionsByExpression = (payload) => ({
    type: SET_TRADUCTIONS_BY_EXPRESSION,
    payload,
});