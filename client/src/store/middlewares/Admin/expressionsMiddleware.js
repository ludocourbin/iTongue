/* Middleware Expressions */

import { toast } from "react-toastify";
import axios from 'axios';

/***** EN ATTENTE DE L'API POUR REFAIRE CE MIDDLEWARE ******/

/* Actions */
import {
    ADD_EXPRESSION_SUBMIT,
    addExpressionSubmitSuccess,
    addExpressionSubmitError,

    FETCH_EXPRESSIONS,
    fetchExpressionSuccess,
    fetchExpressionError,

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
    addTraductionSubmitError,
    
} from "../../actions/Admin/expressionsActions";


const expressionsMiddleware = (store) => (next) => (action) => {
    next(action);

    switch (action.type) {
        case FETCH_EXPRESSIONS: {

            axios({
                method: 'GET',
                url: 'https://itongue.herokuapp.com/expressions',
            })
            .then(res => {
                console.log(res.data.data)
                store.dispatch(fetchExpressionSuccess(res.data.data));
                //toast.success("Les données ont bien été chargées");
            })
            .catch(err => {
                store.dispatch(fetchExpressionError(/* todo */));
                toast.error("Problème lors du chargement des données");
                console.error("FETCH_EXPRESSIONS", err);
            });
            break;
        };
        case SET_TRADUCTIONS_BY_EXPRESSION: {

            const {
                expressionsList,
                expressionId,
            } = store.getState().expressionsReducer;

            const findTradByExpr = expressionsList.find(
                (expression) => {
                    if (expression.id === expressionId) {
                        return expression.translations;
                    }
                },
            );

            store.dispatch(
                setTraductionsByExpressionSuccess(
                    findTradByExpr.translations
                )
            );
            break;
        };
        case ADD_EXPRESSION_SUBMIT: {

            const objData = {
                label: store.getState().expressionsReducer.newExpressionInputValue,
            };

            axios({
                method: 'POST',
                url: 'https://itongue.herokuapp.com/admin/expressions',
                data: {...objData}
            })
            .then(res => {
                store.dispatch(addExpressionSubmitSuccess({...res.data.data, translations: [] }));
                toast.info("Nouvelle expression enregistrée avec succès");
            })
            .catch(err => {
                store.dispatch(addExpressionSubmitError(/* todo */));
                console.error("ADD_EXPRESSION_SUBMIT", err);
            });
            break;
        };
        case DELETE_EXPRESSION: {
            const { expressionsList } = store.getState().expressionsReducer;

            const expressionsFilter = expressionsList.filter((expression) => {
                return expression.id === action.payload ? false : true;
            });

            store.dispatch(deleteExpressionSuccess(expressionsFilter));
            toast.error("L'expression a bien été supprimée");
            break;
        };
        case ADD_TRADUCTION_SUBMIT: {

            const {
                expressionsList,
                expressionId,
                newTraductionInputValue,
            } = store.getState().expressionsReducer;

            const dataObj = {
                text: newTraductionInputValue.translation, 
                expression_id: expressionId, 
                language_id : 1, // Voir pour obtenir la langue sélectionné 
            }

            axios({
                method: "POST",
                url: 'https://itongue.herokuapp.com/admin/translations/',
                data: {...dataObj},
            })
            .then(res => {

                const data = res.data.data;

                const expressionListWithNewTrad = expressionsList.map(
                    (expression) => {
                        if (expression.id === expressionId) {
                            return {
                                ...expression,
                                translations: [
                                    ...expression.translations,
                                    {
                                        ...dataObj,
                                        id: data.id,
                                    },
                                ],
                            };
                        }
                        return expression;
                    }
                );
    
                store.dispatch(addTraductionSubmitSuccess(expressionListWithNewTrad));
                store.dispatch(setTraductionsByExpression());
                toast.info("Nouvelle traduction enregistrée avec succès");

            })
            .catch(err => {
                store.dispatch(addTraductionSubmitError(/* todo */));
                console.error("ADD_TRADUCTION_SUBMIT", err);
            });
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
        };
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
        };
        default:
            break;
    }
};

export default expressionsMiddleware;
