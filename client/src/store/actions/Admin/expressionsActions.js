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


// Expression ID Select

export const EXPRESSION_ID_SELECT = "EXPRESSION_ID_SELECT";

export const expressionIdSelect = (payload) => ({
    type: EXPRESSION_ID_SELECT,
    payload,
});

/* Traductions  */

// Set traductions in state
export const SET_TRADUCTIONS_BY_EXPRESSION = "SET_TRADUCTIONS_BY_EXPRESSION";
export const SET_TRADUCTIONS_BY_EXPRESSION_SUCCESS = "SET_TRADUCTIONS_BY_EXPRESSION_SUCCESS";

export const setTraductionsByExpression = () => ({
    type: SET_TRADUCTIONS_BY_EXPRESSION,
});

export const setTraductionsByExpressionSuccess = (payload) => ({
    type: SET_TRADUCTIONS_BY_EXPRESSION_SUCCESS,
    payload,
});

// Add traduction
export const ADD_TRADUCTION_SUBMIT = "ADD_TRADUCTION_SUBMIT";
export const ADD_TRADUCTION_SUBMIT_SUCCESS = "ADD_TRADUCTION_SUBMIT_SUCCESS";
export const ADD_TRADUCTION_SUBMIT_ERROR = "ADD_TRADUCTION_SUBMIT_ERROR";
export const ADD_TRADUCTION_INPUT_VALUE = "ADD_TRADUCTION_INPUT_VALUE";

export const addTraductionSubmit = () => ({
    type: ADD_TRADUCTION_SUBMIT,
});

export const addTraductionSubmitSuccess = (payload) => ({
    type: ADD_TRADUCTION_SUBMIT_SUCCESS,
    payload,
});

export const addTraductionSubmitError = (payload) => ({
    type: ADD_TRADUCTION_SUBMIT_ERROR,
    payload,
});

export const addTraductionInputValue = (payload) => ({
    type: ADD_TRADUCTION_INPUT_VALUE,
    payload,
});

// Edit expression
export const EDIT_TRADUCTION_SUBMIT = "EDIT_TRADUCTION_SUBMIT";
export const EDIT_TRADUCTION_SUBMIT_SUCCESS = "EDIT_TRADUCTION_SUBMIT_SUCCESS";
export const EDIT_TRADUCTION_SUBMIT_ERROR = "EDIT_TRADUCTION_SUBMIT_ERROR";
export const EDIT_TRADUCTION_INPUT_VALUE = "EDIT_TRADUCTION_INPUT_VALUE";

export const editTraductionSubmit = () => ({
    type: EDIT_TRADUCTION_SUBMIT,
});

export const editTraductionSubmitSuccess = (payload) => ({
    type: EDIT_TRADUCTION_SUBMIT_SUCCESS,
    payload,
});

export const editTraductionSubmitError = (payload) => ({
    type: EDIT_TRADUCTION_SUBMIT_ERROR,
    payload,
});

export const editTraductionInputValue = (payload) => ({
    type: EDIT_TRADUCTION_INPUT_VALUE,
    payload,
});

// Delete traduction
export const DELETE_TRADUCTION = "DELETE_TRADUCTION";
export const DELETE_TRADUCTION_SUCCESS = "DELETE_TRADUCTION_SUCCESS";
export const DELETE_TRADUCTION_ERROR = "DELETE_TRADUCTION_ERROR";

export const deleteTraduction = (payload) => ({
    type: DELETE_TRADUCTION,
    payload,
});

export const deleteTraductionSuccess = (payload) => ({
    type: DELETE_TRADUCTION_SUCCESS,
    payload,
});

export const deleteTraductionError = (payload) => ({
    type: DELETE_TRADUCTION_ERROR,
    payload,
});