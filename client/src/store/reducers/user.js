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
  CHECK_USER_SLUG_ERROR
} from "../actions/userActions";

import {
  LOGIN_INPUT_CHANGE,
  LOGIN_SUBMIT_SUCCESS,
  LOGIN_SUBMIT_ERROR,
  LOGIN
} from "../actions/loginActions.js";

import {
  EDIT_PROFIL,
  EDIT_PROFIL_SUCCESS,
  EDIT_PROFIL_ERROR,
  EDIT_PROFIL_INPUT,
  EDIT_PROFIL_AVATAR,
  EDIT_PROFIL_AVATAR_SUCCESS,
  EDIT_PROFIL_AVATAR_ERROR,
  EDIT_PROFIL_SLUG,
  EDIT_PROFIL_SLUG_SUCCESS,
  EDIT_PROFIL_SLUG_ERROR,
  EDIT_PROFIL_SLUG_INPUT
} from "../actions/editProfilActions";

import {
  DELETE_IRECORD_SUCCESS_USER_PROFIL,
  SEND_IRECORD_SUCCESS_USER_PROFIL
} from "../actions/irecordsActions.js";

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
    confirm: ""
  },
  loginData: {
    email: "",
    password: "",
    stayConnected: true
  },
  loginErrorMessage: "",
  showPassword: false,
  errorMessagePassword: "",
  errorMessageEmail: "",
  errorMailUsed: "",

  /* EDIT PROFIL */
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
    taughtLanguages: []
  },
  editProfilSlugInputValue: "",
  editProfilSlugMsg: ""
  /* END EDIT PROFIL */
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGNUP_INPUT_CHANGE:
      return {
        ...state,
        signupData: {
          ...state.signupData,
          ...action.payload
        },
        errorMailUsed: ""
      };
    case SET_ERROR_MESSAGE_PASSWORD:
      return {
        ...state,
        errorMessagePassword: action.payload
      };
    case SET_ERROR_MESSAGE_MAIL:
      return {
        ...state,
        errorMessageEmail: action.payload
      };
    case SHOW_PASSWORD:
      return {
        ...state,
        showPassword: !state.showPassword
      };
    case SIGNUP:
      return {
        ...state,
        loading: true,
        currentUser: "",
        errorMailUsed: "",
        errorMessageEmail: "",
        isLogged: false
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
          confirm: ""
        },
        errorMailUsed: "",
        errorMessageEmail: "",
        currentUser: { ...action.payload },
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        editProfilData: {
          ...state.editProfilData,
          ...action.payload.user
        }
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
          confirm: ""
        },
        currentUser: "",
        errorMessageEmail: "",
        errorMailUsed: action.payload
      };
    case LOGIN:
      return {
        ...state,
        loading: true
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
          stayConnected: true
        },
        editProfilData: {
          ...state.editProfilData,
          ...action.payload.user
        },
        isLogged: true
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
          stayConnected: true
        }
      };
    case LOGIN_INPUT_CHANGE:
      return {
        ...state,
        loginData: {
          ...state.loginData,
          ...action.payload
        }
      };
    case LOGOUT:
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        loginData: {
          email: state.currentUser.email,
          password: "",
          stayConnected: true
        },
        currentUser: {},
        loggedMessage: "",
        isLogged: false,
        errorMailUsed: "",
        errorMessageEmail: "",
        allUsersList: [],
        loginErrorMessage: ""
      };
    case FETCH_ALL_USERS:
      return {
        ...state,
        isLoadingallUsers: true
      };
    case FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsersList: [...action.payload],
        isLoadingallUsers: false
      };
    case FETCH_ALL_USERS_ERROR:
      return {
        ...state,
        isLoadingallUsers: false,
        usersListError: action.payload
      };
    case EDIT_PROFIL:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_PROFIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
          password: "",
          confirm: ""
        },
        editProfilData: {
          ...state.editProfilData,
          ...action.payload,
          password: "",
          confirm: ""
        }
      };
    case EDIT_PROFIL_ERROR:
      return {
        ...state,
        isLoading: false
      };
    case EDIT_PROFIL_INPUT:
      return {
        ...state,
        editProfilData: {
          ...state.editProfilData,
          ...action.payload
        },
        userSlugInfos: {
          ...state.userSlugInfos,
          ...action.payload
        }
      };
    case EDIT_PROFIL_AVATAR:
      return {
        ...state,
        userSlugInfos: {
          ...state.userSlugInfos
        }
      };
    case EDIT_PROFIL_AVATAR_SUCCESS:
      return {
        ...state,
        userSlugInfos: {
          ...state.userSlugInfos,
          avatarUrl: action.payload
        },
        currentUser: {
          ...state.currentUser,
          avatarUrl: action.payload
        },
        editProfilData: {
          ...state.editProfilData,
          avatarUrl: action.payload
        }
      };
    case EDIT_PROFIL_AVATAR_ERROR:
      return {
        ...state
      };
    case CHECK_USER_SLUG:
      return {
        ...state
      };
    case CHECK_USER_SLUG_SUCCESS:
      return {
        ...state,
        userSlugInfos: {
          ...state.userSlugInfos,
          ...action.payload
        },
        editProfilData: {
          ...state.editProfilData,
          ...action.payload
        }
      };
    case CHECK_USER_SLUG_ERROR:
      return {
        ...state,
        userSlugInfos: {}
      };
      case EDIT_PROFIL_SLUG:
        return {
          ...state
        };
      case EDIT_PROFIL_SLUG_SUCCESS:
        return {
            ...state,
            userSlugInfos: {
                ...state.userSlugInfos,
                slug: action.payload,
            },
            currentUser: {
                ...state.currentUser,
                slug: action.payload,
            },
            editProfilData: {
                ...state.editProfilData,
                slug: action.payload,
            },
            editProfilSlugMsg: "",
        };
    case EDIT_PROFIL_SLUG_ERROR:
      return {
        ...state,
        editProfilSlugMsg: action.payload
      };
    case EDIT_PROFIL_SLUG_INPUT:
      return {
        ...state,
        editProfilSlugInputValue: action.payload,
        editProfilData: {
          ...state.editProfilData,
          slug: action.payload
        }
      };
    case DELETE_IRECORD_SUCCESS_USER_PROFIL:
      return {
        ...state,
        userSlugInfos: {
          ...state.userSlugInfos,
          records: [...action.payload]
        }
      };
    case SEND_IRECORD_SUCCESS_USER_PROFIL:
      return {
        ...state,
        userSlugInfos: {
          ...state.userSlugInfos,
          records: [...state.userSlugInfos.records, action.payload]
        }
      };
    default:
      return state;
  }
};
