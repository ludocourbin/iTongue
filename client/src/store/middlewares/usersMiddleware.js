import { FETCH_ALL_USERS, fetchAllUsersSuccess, fetchAllUsersError } from "../actions/userActions";
import { EDIT_PROFIL, editProfilSuccess, editProfilError } from "../actions/editProfilActions";

import axios from 'axios';

export const usersMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_ALL_USERS: {
            axios({
                method: 'GET',
                url: 'https://itongue.herokuapp.com/users',
            })
            .then(res => {
                const users = res.data.data; 
                const usersWithType = users.map(user => {
                    return {
                        ...user,
                        type: 'member',
                    };
                });
                store.dispatch(fetchAllUsersSuccess(usersWithType));
            })
            .catch(err => {
                store.dispatch(fetchAllUsersError("Un problème est survenue lors du chargement de la liste des Utilisateurs"));
                console.error(err);
            })
            break;
        };

        case EDIT_PROFIL : {

            /* On récupere les data editées depuis le store*/
            const { 
                id, 
                avatarUrl: avatar_url, // a test
                createdAt, 
                records, 
                isAdmin, 
                learnedLanguages,
                taughtLanguages,
                ...editProfilData 
            } = store.getState().user.editProfilData;

            /* Avec cette liste de languages, 
            on va chercher l'id dans notre allLanguagesList 
            pour renvoyer toutes les infos concernant cet ID 
            */
            const { allLanguagesList } = store.getState().languagesReducer;

            const mapper = (role) => {
                return role.map(learnLanguageId => {
                    return allLanguagesList.find(language => {
                        if (language.id === learnLanguageId) {
                            return language;
                        }
                    });
                }) 
            };

            const finalData = {
                ...editProfilData,
                //learnedLanguages: mapper(learnedLanguages),
                //taughtLanguages: mapper(taughtLanguages),
            };

            console.log("finalData", finalData);

            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API_URL}/users/${id}`,
                data: finalData,
                headers: {
                    "Authorization": `Bearer ${store.getState().user.accessToken}`
                }
            })
            .then(res => {
                console.log(res);
                store.dispatch(editProfilSuccess(finalData));
            })
            .catch(err => {
                console.error(err);
                store.dispatch(editProfilError(/* Todo */));
            })  
            break;
        };
        default:
            break;
    };
};