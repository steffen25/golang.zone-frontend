import decode from "jwt-decode";
import Router from "vue-router";
import api from "./api";

const authToken = "authToken";
const refreshToken = "refreshToken";
const userKey = "user";

export function login(credentials) {
  return api.post("auth/login", {
    email: credentials.email,
    password: credentials.password
  });
}

export function register(credentials) {
  return api.post("users", {
    name: credentials.name,
    email: credentials.email,
    password: credentials.password
  });
}

export function logout() {
  return api.get("auth/logout");
}

export function isLoggedIn() {
  let authToken = getAuthToken();
  return !!authToken && !isTokenExpired(authToken);
}

export function isUser() {
  let user = JSON.parse(localStorage.getItem("user"));
  return user;
}

export function isAdmin() {
  let token = localStorage.getItem("authToken");
  if (token === null || token === undefined) return false;
  let tokenDecoded = decode(token);
  return tokenDecoded.admin;
}

export function setUser(data) {
  localStorage.setItem(userKey, data);
}

export function clearUser() {
  localStorage.removeItem(userKey);
}

export function removeAuthToken() {
  localStorage.removeItem(authToken);
}

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    // User is not loggedin
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    // If user is loggedin keep going
    next();
  }
}

export function getAuthToken() {
  const token = localStorage.getItem("authToken");
  return token;
}

export function clearAuthToken() {
  localStorage.removeItem(authToken);
}
export function clearRefreshToken() {
  localStorage.removeItem(refreshToken);
}

export function setAccessToken(token) {
  localStorage.setItem(authToken, token);
}

export function setRefreshToken(token) {
  localStorage.setItem(refreshToken, token);
}

export function getRefreshToken(token) {
  localStorage.getItem(refreshToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

export function decodeToken() {
  const token = decode(getAuthToken());
  if (!token) {
    return;
  }
  return token;
}

export function refreshTokenMinLeft() {
  let refreshToken = decode(localStorage.getItem("refreshToken"));
  let refreshTokenMinLeft = (refreshToken.exp - Date.now() / 1000) / 60;
  return parseFloat(refreshTokenMinLeft.toFixed(2));
}

export function authTokenMinLeft() {
  let authToken = decode(localStorage.getItem("authToken"));
  let authTokenMinLeft = (authToken.exp - Date.now() / 1000) / 60;
  return parseFloat(authTokenMinLeft.toFixed(2));
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
