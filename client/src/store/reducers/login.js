import {
    LOGIN_INPUT_CHANGE,
    LOGIN_SUBMIT_SUCCESS,
    LOGIN_SUBMIT_ERROR,
    LOGIN,
    SHOW_PASSWORD,
  } from '../actions/loginActions.js';
  
  // Je décris mon state initial
  const initialState = {
    loginData: {
      email: '',
      password: '',
      stayConnected:true,
    },
    showPassword:false,
    loading:false,
    loginErrorMessage: '',
  };
  
  // Je décris mon state à tout instant
  export default (state = initialState, action = {}) => {
    switch (action.type) {
      case LOGIN:
      return {
        ...state,
        loading: true,
      };
      case LOGIN_SUBMIT_SUCCESS:    
        return {
          ...state,
          loading: false,
          loginErrorMessage: '',
        };
      case LOGIN_SUBMIT_ERROR:
        return {
          ...state,
          loading: false,
          loginErrorMessage: action.payload,
        };
      case LOGIN_INPUT_CHANGE:
        return {
          ...state,
          loginData: {
            ...state.loginData,
            ...action.payload,
          },
        };
        case SHOW_PASSWORD:
            return {
                ...state,
                showPassword: !state.showPassword
            };  
      default:
        return state;
    }
  };