export const EDIT_PROFIL = "EDIT_PROFIL";
export const EDIT_PROFIL_SUCCESS = "EDIT_PROFIL_SUCCESS";
export const EDIT_PROFIL_ERROR = "EDIT_PROFIL_ERROR";
export const EDIT_PROFIL_INPUT = "EDIT_PROFIL_INPUT";

export const editProfil = () => ({
    type: EDIT_PROFIL,
});

export const editProfilSuccess = (payload) => ({
    type: EDIT_PROFIL_SUCCESS,
    payload
});

export const editProfilError = (payload) => ({
    type: EDIT_PROFIL_ERROR,
    payload
});

export const editProfilInput = (payload) => ({
    type: EDIT_PROFIL_INPUT,
    payload
});
