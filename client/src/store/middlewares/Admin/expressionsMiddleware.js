/* Middleware Expressions */

import { toast } from "react-toastify";

/* Actions */
import {
    ADD_EXPRESSION_SUBMIT,
    addExpressionSubmitSuccess,
    GET_FAKE_DATA,
    setFakeData,
    ADD_TRADUCTION_SUBMIT,
    addTraductionSubmitSuccess,
    SET_TRADUCTIONS_BY_EXPRESSION,
    setTraductionsByExpression,
    setTraductionsByExpressionSuccess,
    DELETE_EXPRESSION,
    deleteExpressionSuccess,
    DELETE_TRADUCTION,
    deleteTraductionSuccess,
} from "../../actions/Admin/expressionsActions";

/* Fake Data */
import { expressions } from "../../../data/expressions";

const expressionsMiddleware = (store) => (next) => (action) => {
    next(action);

    switch (action.type) {
        case GET_FAKE_DATA: {
            // à modifier pour GET toutes les expressions lorsque le back sera prêt
            store.dispatch(setFakeData(expressions));
            toast.success("Les données ont bien été chargées");
            break;
        }
        case SET_TRADUCTIONS_BY_EXPRESSION: {
            const {
                expressionsList,
                expressionId,
            } = store.getState().expressionsReducer;

            const findTraductionsByExpression = expressionsList.find(
                (expression) => {
                    if (expression.id === expressionId) {
                        return expression.traductions;
                    }
                }
            );

            store.dispatch(
                setTraductionsByExpressionSuccess(
                    findTraductionsByExpression.traductions
                )
            );
            break;
        }
        case ADD_TRADUCTION_SUBMIT: {
            const {
                expressionsList,
                expressionId,
                newTraductionInputValue,
            } = store.getState().expressionsReducer;

            /* Temporaire */
            const findExpression = expressionsList.find(
                (expression) => expression.id === expressionId
            );

            const tempCreateFakeId = () => {
                return findExpression.traductions.length + 1;
            };
            /* --- */

            const expressionListWithNewTrad = expressionsList.map(
                (expression) => {
                    if (expression.id === expressionId) {
                        return {
                            ...expression,
                            traductions: [
                                ...expression.traductions,
                                {
                                    id: tempCreateFakeId(),
                                    langue: newTraductionInputValue.langue,
                                    traduction:
                                        newTraductionInputValue.traduction,
                                },
                            ],
                        };
                    }
                    return expression;
                }
            );

            store.dispatch(
                addTraductionSubmitSuccess(expressionListWithNewTrad)
            );
            store.dispatch(setTraductionsByExpression());
            toast.success("Nouvelle traduction enregistré avec succés");
            break;
        }
        case DELETE_TRADUCTION: {
            const {
                expressionsList,
                expressionId,
            } = store.getState().expressionsReducer;

            const findExpression = expressionsList.find(
                (expression) => expression.id === expressionId
            );

            const removeTraduction = findExpression.traductions.filter(
                (traduction) => {
                    return traduction.id === action.payload ? false : true;
                }
            );

            const map = expressionsList.map((expression) => {
                if (expression.id === expressionId) {
                    return {
                        ...expression,
                        traductions: [...removeTraduction],
                    };
                }
                return expression;
            });

            store.dispatch(deleteTraductionSuccess(map));
            store.dispatch(setTraductionsByExpression());
            break;
        }
        case ADD_EXPRESSION_SUBMIT: {
            // à modifier pour POST la nouvelle expression lorsque le back sera prêt

            const tempCreateFakeId = () => {
                return (
                    store.getState().expressionsReducer.expressionsList.length +
                    1
                );
            };

            const objData = {
                id: tempCreateFakeId(),
                country: "uk",
                expression: store.getState().expressionsReducer
                    .newExpressionInputValue,
                nbrTraductions: 0,
                traductions: [],
            };

            store.dispatch(addExpressionSubmitSuccess(objData));
            break;
        }
        case DELETE_EXPRESSION: {
            const { expressionsList } = store.getState().expressionsReducer;

            const expressionsFilter = expressionsList.filter((expression) => {
                return expression.id === action.payload ? false : true;
            });

            store.dispatch(deleteExpressionSuccess(expressionsFilter));
            toast.info("L'expression a bien été supprimée", {
                pauseOnHover: true,
            });
            break;
        }
        default:
            break;
    }
};

export default expressionsMiddleware;
