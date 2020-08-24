import {
    FETCH_ALL_USERS,
    fetchAllUsersSuccess,
    fetchAllUsersError,
    CHECK_USER_SLUG,
    checkUserSlugSuccess,
    checkUserSlugError,
    checkUserSlug,
} from "../actions/userActions";

import {
    EDIT_PROFIL,
    editProfilSuccess,
    editProfilError,
    EDIT_PROFIL_AVATAR,
    editProfilAvatarSuccess,
} from "../actions/editProfilActions";

import axios from "axios";

export const usersMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_ALL_USERS: {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_URL}/users`,
            })
                .then((res) => {
                    const users = res.data.data;
                    const usersWithType = users.map((user) => {
                        return {
                            ...user,
                            type: "member",
                        };
                    });
                    store.dispatch(fetchAllUsersSuccess(usersWithType));
                })
                .catch((err) => {
                    store.dispatch(
                        fetchAllUsersError(
                            "Un problème est survenue lors du chargement de la liste des Utilisateurs"
                        )
                    );
                    console.error(err);
                });
            break;
        }

        case EDIT_PROFIL: {
            /* On récupere les data editées depuis le store*/
            /* On retires celles que l'on utilise pas avec cette méthode : */
            const { 
                id, 
                avatarUrl, // a test
                createdAt, 
                records, 
                isAdmin, 
                learnedLanguages,
                taughtLanguages,
                modifyTaughtLanguages,
                modifylearnedLanguages,
                password,
                confirm,
                ...editProfilData 
            } = store.getState().user.editProfilData;

            const { allLanguagesList } = store.getState().languagesReducer;

            /*  Avec cette liste de languages, 
                on va chercher l'id dans notre allLanguagesList 
                pour renvoyer toutes les infos concernant cet ID 
            */
            const mapper = (role) => {
                return role.map((learnLanguageId) => {
                    return allLanguagesList.find((language) => {
                        if (language.id === learnLanguageId) {
                            return language;
                        }
                    });
                });
            };

            /* On check si le param est un objet */
            var checkIsObject = (array) => array.some(  
                value => { return typeof value == "object" } ); 

            /* On renvoie editprofildata, et on modifie deux propriétées avec certaines conditions */
            let finalData = {
                ...editProfilData,
                learnedLanguages: checkIsObject(learnedLanguages) ? learnedLanguages : mapper(learnedLanguages),
                taughtLanguages: checkIsObject(taughtLanguages) ? taughtLanguages : mapper(taughtLanguages),
            };

            /* On check si le form comporte une modification de mot de passe */
            if (password !== "" && confirm !== "") {
                finalData= {
                    ...finalData,
                    password,
                    confirm,
                }
            }

            axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}/users/${id}`,
                data: finalData,
                headers: {
                    Authorization: `Bearer ${
                        store.getState().user.accessToken
                    }`,
                },
            })
                .then((res) => {
                    console.log(res);
                    store.dispatch(editProfilSuccess(finalData));
                })
                .catch((err) => {
                    console.error(err);
                    store.dispatch(editProfilError(/* Todo */));
                });
            break;
        }

        case EDIT_PROFIL_AVATAR: {
            const { currentUser, accessToken } = store.getState().user;
            const formData = new FormData();
            formData.append("avatar", action.payload);

            axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}/users/${currentUser.id}/avatar`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then(res => {
                const responseAvatarUrl = `${res.data.data.avatarUrl}?v=${Date.now()}`;
               // const newAvatarUrl = `${process.env.REACT_APP_API_URL}/${responseAvatarUrl}`;
                store.dispatch(editProfilAvatarSuccess(responseAvatarUrl))
            })
            .catch(err => {
                console.error(err);
            })
            break;
        }

        case CHECK_USER_SLUG: {

            const selectedLanguages = (role) => {
                const map = role.map((language, index) => {
                    return language.id || index + 1 ;
                });
                return map;
            };

            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_URL}/users/${action.payload}`,
            })
            .then(res => {
                
                const profilData = res.data.data;
                let profilUserData = {
                    ...res.data.data,
                    modifyTaughtLanguages: selectedLanguages(profilData.taughtLanguages),
                    modifylearnedLanguages: selectedLanguages(profilData.learnedLanguages),
                    avatarUrl: `${profilData.avatarUrl}?v=${Date.now()}`
                };
                store.dispatch(checkUserSlugSuccess(profilUserData));
            })
            .catch(err => {
                store.dispatch(checkUserSlugError(/* */));
                console.error(err);
            })
            break;
        }
        default:
            break;
    }
};
