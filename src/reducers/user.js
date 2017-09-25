import jwtDecode from "jwt-decode";
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER
} from "../constants/user";

const initialState = {
  token: null,
  id: null,
  admin: null,
  isAuthenticating: false,
  isAuthenticated: false,
  statusText: null
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true,
        isAuthenticated: false,
        statusText: null
      });
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        id: jwtDecode(action.user.data.token).id,
        admin: jwtDecode(action.user.data.token).admin,
        token: action.user.data.token,
        statusText: "You have successfully logged in."
      });
    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        statusText: "Incorrect Email or Password."
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        id: null,
        admin: null,
        token: null,
        statusText: "You have successfully logged out."
      });
    case LOGOUT_USER_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        statusText: "You have failed logging out."
      });
    default:
      return state;
  }
}

/* export default createReducer(initialState, {
  [LOGIN_USER_REQUEST]: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticating: true,
      statusText: null
    }),
  [LOGIN_USER_SUCCESS]: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      token: payload.token,
      admin: jwtDecode(payload.token).admin,
      id: jwtDecode(payload.token).id,
      statusText: "You have been successfully logged in."
    }),
  [LOGIN_USER_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      id: null,
      admin: null,
      statusText: `Authentication Error: ${payload.status} ${payload.statusText}`
    }),
  [LOGOUT_USER]: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      admin: null,
      id: null,
      statusText: "You have been successfully logged out."
    })
});
 */
