export const TOGGLE_MENU = "TOGGLE_MENU";
export const SET_CAPTCHA_TOKEN = "SET_CAPTCHA_TOKEN";

export const toggleMenu = () => ({
  type: TOGGLE_MENU
});

export const setCaptchaToken = token => ({
  type: SET_CAPTCHA_TOKEN,
  payload: token
});
