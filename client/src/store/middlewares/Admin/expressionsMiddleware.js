/* Expressionsiddleware */

import { toast } from "react-toastify";
import axios from 'axios';

/* Actions */
import {
    // Fetch Data
    FETCH_EXPRESSIONS,
    fetchExpressionSuccess,
    fetchExpressionError,

    // Expression add
    ADD_EXPRESSION_SUBMIT,
    addExpressionSubmitSuccess,
    addExpressionSubmitError,

    // Expression delete
    DELETE_EXPRESSION,
    deleteExpressionSuccess,
    deleteExpressionError,

    // Traduction add
    ADD_TRADUCTION_SUBMIT,
    addTraductionSubmitSuccess,
    addTraductionSubmitError,

    // Traduction delete
    DELETE_TRADUCTION,
    deleteTraductionSuccess,
    deleteTraductionError,

    // Traduction edit
    EDIT_TRADUCTION_SUBMIT,
    editTraductionSubmitSuccess,
    editTraductionSubmitError,

    // Setter Traductions dans le state
    SET_TRADUCTIONS_BY_EXPRESSION,
    setTraductionsByExpression,
    setTraductionsByExpressionSuccess,

} from "../../actions/Admin/expressionsActions";

const expressionsMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_EXPRESSIONS: { // OK
            axios({
                method: 'GET',
                url: 'https://itongue.herokuapp.com/expressions',
            })
            .then(res => {
                console.log(res.data.data)
                store.dispatch(fetchExpressionSuccess(res.data.data));
            })
            .catch(err => {
                store.dispatch(fetchExpressionError(/* Todo */));
                toast.error("Problème lors du chargement des expressions");
                console.error("FETCH_EXPRESSIONS", err);
            });
            break;
        };
        case SET_TRADUCTIONS_BY_EXPRESSION: { // OK
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
        case ADD_EXPRESSION_SUBMIT: { // OK
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
                store.dispatch(addExpressionSubmitError(/* Todo */));
                toast.error("Une erreur est survenue lors de l'ajout de votre expression");
                console.error("ADD_EXPRESSION_SUBMIT", err);
            });
            break;
        };
        case DELETE_EXPRESSION: { // OK
            const { expressionsList } = store.getState().expressionsReducer;

            axios({
                method: 'DELETE',
                url: `https://itongue.herokuapp.com/admin/expressions/${action.payload}`
            })
            .then(res => {
                console.log(res)
                const expressionsFilter = expressionsList.filter((expression) => {
                    return expression.id === action.payload ? false : true;
                });
    
                store.dispatch(deleteExpressionSuccess(expressionsFilter));
                toast.info("L'expression a bien été supprimée");
            })
            .catch(err => {
                store.dispatch(deleteExpressionError(/* Todo */))
                toast.error("Une erreur est survenue lors de la suppression de cette expression");
                console.error(err);
            });
            break;
        };
        case ADD_TRADUCTION_SUBMIT: { // OK
            const {
                expressionsList,
                expressionId,
                newTraductionInputValue,
            } = store.getState().expressionsReducer;

            const dataObj = {
                text: newTraductionInputValue.text, 
                expression_id: expressionId, 
                language_id : 1, // Voir pour obtenir la langue sélectionné 
                language: {
                    code: newTraductionInputValue.language.code
                },
            };

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
                store.dispatch(addTraductionSubmitError(/* Todo */));
                toast.error("Une erreur est survenue lors de l'ajout de votre traduction");
                console.error("ADD_TRADUCTION_SUBMIT", err);
            });
            break;
        };   
        case EDIT_TRADUCTION_SUBMIT: { // OK

            const { 
                expressionsList, 
                expressionId, 
                editTraductionValue: traductionSelect 
            } = store.getState().expressionsReducer;

            const objData = {
                text: traductionSelect.text, // si on change rien, erreur (a voir)
                expression_id: expressionId,
                language_id: traductionSelect.language.id,
            };

            axios({
                method: 'POST',
                url: `https://itongue.herokuapp.com/admin/translations/${traductionSelect.id}`,
                data: {...objData}
            })
            .then(res => {

                const findExpression = expressionsList.find(expression => expression.id === expressionId);

                const editTraduction = findExpression.translations.map(translation => {
                    if (translation.id === traductionSelect.id) 
                        {
                            return traductionSelect;
                        }
                    return translation;
                });

                const newExpressionList = expressionsList.map(expression => {
                    if( expression.id === expressionId ) {
                        return {
                            ...expression,
                            translations : [...editTraduction] 
                        };
                    }
                    return expression;
                });
                store.dispatch(editTraductionSubmitSuccess(newExpressionList));
                store.dispatch(setTraductionsByExpression());
                toast.info('La traduction a bien été modifiée');
            })
            .catch(err => {
                store.dispatch(editTraductionSubmitError(/* Todo */));
                toast.error('Une erreur est survenue lors de la modification de la traduction');
                console.error(err);
            });
            break;
        };
        case DELETE_TRADUCTION: { // OK

            const {
                expressionsList,
                expressionId,
            } = store.getState().expressionsReducer;

            axios({
                method: 'DELETE',
                url: `https://itongue.herokuapp.com/admin/translations/${action.payload}`
            })
            .then(res => {
                console.log(res)
                const findExpression = expressionsList.find(
                    (expression) => expression.id === expressionId
                );
    
                const removeTranslation = findExpression.translations.filter(
                    (translation) => {
                        return translation.id === action.payload ? false : true;
                    }
                );
    
                const newExpressionList = expressionsList.map(expression => {
                    if( expression.id === expressionId ) {
                        return {
                            ...expression,
                            translations: [...removeTranslation],
                        };
                    }
                    return expression;
                });
    
                store.dispatch(deleteTraductionSuccess(newExpressionList));
                store.dispatch(setTraductionsByExpression());
                toast.info("La traduction a bien été supprimée");
            })
            .catch(err => {
                store.dispatch(deleteTraductionError(/* Todo */));
                toast.error("Une erreur est survenue lors de la suppression de cette traduction");
                console.error(err);
            });
            break;
        };
        default:
            break;
    };
};

export default expressionsMiddleware;

// https://itongue.herokuapp.com/languages ->
// Faire un GET le stocker dans le store, pour l'afficher dans le dropdown de selection de pays