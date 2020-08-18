/* Middleware Expressions */

import { toast } from "react-toastify";
import axios from 'axios';

/***** EN ATTENTE DE L'API POUR REFAIRE CE MIDDLEWARE ******/

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
    EDIT_TRADUCTION_SUBMIT,
    editTraductionSubmitSuccess,
} from "../../actions/Admin/expressionsActions";

/* Fake Data */
import { expressions } from "../../../data/expressions";

const expressionsMiddleware = (store) => (next) => (action) => {
    next(action);

    switch (action.type) {
        case GET_FAKE_DATA: {

            axios({
                method: 'GET',
                url: 'https://itongue.herokuapp.com/expressions',
            })
            .then(res => {
                console.log(res.data.data)
            })
            .catch(err => {
                console.error(err);
            });

            axios({
                method: 'GET',
                url: 'https://itongue.herokuapp.com/traductions',
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            });

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
            toast.info("Nouvelle traduction enregistrée avec succès");
            break;
        };   
        case EDIT_TRADUCTION_SUBMIT: {
            
            const traductionSelect = store.getState().expressionsReducer.editTraductionValue;

            const { expressionsList, expressionId } = store.getState().expressionsReducer;

            const findExpression = expressionsList.find(expression => expression.id === expressionId);

            const editTraduction = findExpression.traductions.map(traduction => {
                if (traduction.id === traductionSelect.id) 
                    {
                        return traductionSelect;
                    }
                return traduction;
            });

            const newExpressionList = expressionsList.map(expression => {
                if( expression.id === expressionId ) {
                    return {
                        ...expression,
                        traductions : [...editTraduction] 
                    }
                }
                return expression;
            });

            console.log(traductionSelect)
            store.dispatch(editTraductionSubmitSuccess(newExpressionList));
            store.dispatch(setTraductionsByExpression());
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

            const newExpressionList = expressionsList.map(expression => {
                if( expression.id === expressionId ) {
                    return {
                        ...expression,
                        traductions: [...removeTraduction],
                    };
                }
                return expression;
            });

            store.dispatch(deleteTraductionSuccess(newExpressionList));
            store.dispatch(setTraductionsByExpression());
            toast.error("La traduction a bien été supprimée");
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
                
                label: store.getState().expressionsReducer.newExpressionInputValue,
                nbrTraductions: 0,
                traductions: [],
            };

            axios({
                method: 'POST',
                url: 'https://itongue.herokuapp.com/admin/expression',
                data: {...objData}
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });

            const objData1 = {
                id: tempCreateFakeId(),
                label: store.getState().expressionsReducer.newExpressionInputValue,
                nbrTraductions: 0,
                traductions: [],
            };

            store.dispatch(addExpressionSubmitSuccess(objData));
            toast.info("Nouvelle expression enregistrée avec succès");
            
            axios({
                method: "POST",
                url: 'http://localhost:3001/admin/expression',
                data: {
                    label: "label", 
                    text: "text", 
                    language_id : 1
                },
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            });

            break;
        }
        case DELETE_EXPRESSION: {
            const { expressionsList } = store.getState().expressionsReducer;

            const expressionsFilter = expressionsList.filter((expression) => {
                return expression.id === action.payload ? false : true;
            });

            store.dispatch(deleteExpressionSuccess(expressionsFilter));
            toast.error("L'expression a bien été supprimée");
            break;
        }
        default:
            break;
    }
};

export default expressionsMiddleware;
