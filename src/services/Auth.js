import axios from "axios";
import authHelper from "../services/Auth";

export default {
  user: {
    login: credentials =>
      axios
        .post("https://golang.zone/api/v1/auth/login", {
          email: credentials.email,
          password: credentials.password
        })
        .then(res => res.data),

    logout: () =>
      axios
        .get("https://golang.zone/api/v1/auth/logout", {
          headers: authHelper.auth.header
        })
        .then(res => res.data)
  }
};
