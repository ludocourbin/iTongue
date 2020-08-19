import axios from "axios";
import { LOGIN, loginSubmitSuccess, loginSubmitError } from "../actions/loginActions";
import { toast } from "react-toastify";


const ajaxLogMiddleware = (store) => (next) => (action) => {
  next(action);
  switch (action.type) {
    case LOGIN:
      const data = store.getState().login.loginData;
      axios({
        method: "post",
        url: "https://itongue.herokuapp.com/users/login",
        data,
      })
        .then((res) => {
          console.log("axios ok");
          toast.info("Connexion en cours..");
          store.dispatch(loginSubmitSuccess(res.data));
        })
        .catch((err) => {
          toast.warning("Sorry");
          store.dispatch(
            loginSubmitError("Désolé cet utilisateur n'existe pas")
          );
        });
    default:
      return;
  }
};

export default ajaxLogMiddleware;