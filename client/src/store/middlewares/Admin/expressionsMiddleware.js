/* Middleware Expressions */

/* Actions */
import {
    ADD_EXPRESSION_SUBMIT, 
    addExpressionSubmitSuccess , 
    GET_FAKE_DATA, 
    setFakeData 
} from "../../actions/Admin/expressionsActions";

/* Fake Data */
import { expressions } from '../../../data/expressions';

const expressionsMiddleware = (store) => (next) => (action) => {

    next(action);

    switch (action.type) {
        case GET_FAKE_DATA: {
            // à modifier pour GET toutes les expressions lorsque le back sera prêt
            store.dispatch(setFakeData(expressions));
            break;
        };
        case ADD_EXPRESSION_SUBMIT: {
            // à modifier pour POST la nouvelle expression lorsque le back sera prêt
            const objData = {
                country: 'uk',
                expression: store.getState().expressionsReducer.newExpressionInputValue,
                nbrTraductions: 0,
                traductions: [],
            };

            store.dispatch(addExpressionSubmitSuccess(objData));
            break;
        };
        default:
            break;
    };
};

export default expressionsMiddleware;