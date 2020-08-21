import {
    SIGNUP_INPUT_CHANGE,
    SET_ERROR_MESSAGE_PASSWORD,
    SET_ERROR_MESSAGE_MAIL,
    SHOW_PASSWORD,
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGOUT,
    FETCH_ALL_USERS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_ERROR,
    CHECK_USER_SLUG,
    CHECK_USER_SLUG_SUCCESS,
} from "../actions/userActions";

import {
    LOGIN_INPUT_CHANGE,
    LOGIN_SUBMIT_SUCCESS,
    LOGIN_SUBMIT_ERROR,
    LOGIN,
} from "../actions/loginActions.js";

import {
    EDIT_PROFIL,
    EDIT_PROFIL_SUCCESS,
    EDIT_PROFIL_ERROR,
    EDIT_PROFIL_INPUT,
    EDIT_PROFIL_AVATAR,
    EDIT_PROFIL_AVATAR_SUCCESS,
    EDIT_PROFIL_AVATAR_ERROR,
} from "../actions/editProfilActions";

const initialState = {
    currentUser: {},
    isLogged: false,
    loading: false,
    accessToken: null,
    refreshToken: null,
    signupData: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm: "",
    },
    loginData: {
        email: "",
        password: "",
        stayConnected: true,
    },
    showPassword: false,
    errorMessagePassword: "",
    errorMessageEmail: "",
    errorMailUsed: "",

    allUsersList: [],
    userSlugInfos: {},
    isLoadingallUsers: false,
    usersListError: "",

    editProfilData: {
        id: 0,
        email: "",
        bio: "",
        avatarUrl: "",
        firstname: "",
        lastname: "",
        slug: "",
        learnedLanguages: [],
        taughtLanguages: [],
    },
};
export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SIGNUP_INPUT_CHANGE:
            return {
                ...state,
                signupData: {
                    ...state.signupData,
                    ...action.payload,
                },
                errorMailUsed: "",
            };
        case SET_ERROR_MESSAGE_PASSWORD:
            return {
                ...state,
                errorMessagePassword: action.payload,
            };
        case SET_ERROR_MESSAGE_MAIL:
            return {
                ...state,
                errorMessageEmail: action.payload,
            };
        case SHOW_PASSWORD:
            return {
                ...state,
                showPassword: !state.showPassword,
            };
        case SIGNUP:
            return {
                ...state,
                loading: true,
                currentUser: "",
                errorMailUsed: "",
                errorMessageEmail: "",
                isLogged: false,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                isLogged: true,
                signupData: {
                    firstname: "",
                    lastname: "",
                    email: "",
                    password: "",
                    confirm: "",
                },
                errorMailUsed: "",
                errorMessageEmail: "",
                currentUser: { ...action.payload },
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                editProfilData: {
                    ...state.editProfilData,
                    ...action.payload.user,
                },
            };
        case SIGNUP_ERROR:
            return {
                ...state,
                isLogged: false,
                loading: false,
                signupData: {
                    firstname: state.signupData.firstname,
                    lastname: state.signupData.lastname,
                    email: state.signupData.email,
                    password: "",
                    confirm: "",
                },
                currentUser: "",
                errorMessageEmail: "",
                errorMailUsed: action.payload,
            };
        case LOGIN:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUBMIT_SUCCESS:
            return {
                ...state,
                loading: false,
                loginErrorMessage: "",
                currentUser: { ...action.payload.user },
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                loginData: {
                    email: "",
                    password: "",
                    stayConnected: true,
                },
                editProfilData: {
                    ...state.editProfilData,
                    ...action.payload.user,
                },
                isLogged: true,
            };
        case LOGIN_SUBMIT_ERROR:
            return {
                ...state,
                loading: false,
                loginErrorMessage: action.payload,
                currentUser: "",
                accessToken: "",
                refreshToken: "",
                loginData: {
                    email: state.loginData.email,
                    password: "",
                    stayConnected: true,
                },
            };
        case LOGIN_INPUT_CHANGE:
            return {
                ...state,
                loginData: {
                    ...state.loginData,
                    ...action.payload,
                },
            };
        case LOGOUT:
            return {
                ...state,
                accessToken: null,
                refreshToken: null,
                loginData: {
                    email: state.currentUser.email,
                    password: "",
                    stayConnected: true,
                },
                currentUser: {},
                loggedMessage: "",
                isLogged: false,
                errorMailUsed: "",
                errorMessageEmail: "",
                allUsersList: [],
            };
        case FETCH_ALL_USERS:
            return {
                ...state,
                isLoadingallUsers: true,
            };
        case FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                allUsersList: [...action.payload],
                isLoadingallUsers: false,
            };
        case FETCH_ALL_USERS_ERROR:
            return {
                ...state,
                isLoadingallUsers: false,
                usersListError: action.payload,
            };
        case EDIT_PROFIL:
            return {
                ...state,
                isLoading: true,
            };
        case EDIT_PROFIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: {
                    ...state.currentUser,
                    ...action.payload,
                },
            };
        case EDIT_PROFIL_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        case EDIT_PROFIL_INPUT:
            return {
                ...state,
                editProfilData: {
                    ...state.editProfilData,
                    ...action.payload,
                },
            };
        case EDIT_PROFIL_AVATAR:
            return {
                ...state,
            };
        case EDIT_PROFIL_AVATAR_SUCCESS:
            return {
                ...state,
                editProfilData: {
                    ...state.editProfilData,
                    avatarUrl: action.payload,
                },
                currentUser: {
                    ...state.currentUser,
                    avatarUrl: action.payload,
                },
            };
        case EDIT_PROFIL_AVATAR_ERROR:
            return {
                ...state,
            };

        case CHECK_USER_SLUG:
            return {
                ...state,
            };
        case CHECK_USER_SLUG_SUCCESS:
            return {
                ...state,
                userSlugInfos: action.payload,
            };
        default:
            return state;
    }
};
