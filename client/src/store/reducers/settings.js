import { TOGGLE_MENU, SET_CAPTCHA_TOKEN } from "../actions/settingsActions";

const initialState = {
  // loading: false,
  visible: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        visible: !state.visible
      };
    case SET_CAPTCHA_TOKEN:
      return {
        ...state,
        captchaToken: action.payload
      };
    default:
      return state;
  }
};
