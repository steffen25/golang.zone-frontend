import api from "../services/Auth";
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER
} from "../constants/user";

export const login = credentials => dispatch =>
  api.user
    .login(credentials)
    .then(user => {
      dispatch({ type: LOGIN_USER_SUCCESS, user });
    })
    .catch(() => {
      dispatch({ type: LOGIN_USER_FAILURE });
    });

export const logout = () => dispatch => {
  api.user.logout();
  localStorage.removeItem("gozoneJWT");
  dispatch({ type: LOGOUT_USER });
};
