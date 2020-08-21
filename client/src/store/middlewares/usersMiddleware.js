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
            
            break;
        };
        default:
            break;
    };
};