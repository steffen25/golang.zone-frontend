import decode from "jwt-decode";
import axios from "axios";
import Router from "vue-router";

const api = axios.create({
  baseURL: "https://golang.zone/api/v1/",
  timeout: 15000,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

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
  let user = JSON.parse(localStorage.getItem(userKey));
  return user;
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
  return localStorage.getItem(authToken);
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

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
