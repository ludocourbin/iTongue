import axios from "axios";
import { LOGIN, loginSubmitSuccess, loginSubmitError } from "../actions/loginActions";


const ajaxLogMiddleware = (store) => (next) => (action) => {
  next(action);
  switch (action.type) {
    case LOGIN:
      axios({
        method: "post",
        url: "http://localhost:3001/login",
        data: store.getState().loginData,
      })
        .then((res) => {
          toast.info("Connexion en cours..");
          store.dispatch(loginSubmitSuccess(res.data));
        })
        .catch((err) => {
          store.dispatch(
            loginSubmitError("Désolé cet utilisateur n'existe pas")
          );
        });
    default:
      return;
  }
};

export default ajaxLogMiddleware;