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

export const EDIT_PROFIL_AVATAR = "EDIT_PROFIL_AVATAR";
export const EDIT_PROFIL_AVATAR_SUCCESS = "EDIT_PROFIL_AVATAR_SUCCESS";
export const EDIT_PROFIL_AVATAR_ERROR = "EDIT_PROFIL_AVATAR_ERROR";

export const editProfilAvatar = (payload) => ({
    type: EDIT_PROFIL_AVATAR,
    payload ,
});

export const editProfilAvatarSuccess = (payload) => ({
    type: EDIT_PROFIL_AVATAR_SUCCESS,
    payload
});

export const editProfilAvatarError = (payload) => ({
    type: EDIT_PROFIL_AVATAR_ERROR,
    payload
});