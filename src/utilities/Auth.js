export default {
  auth: {
    header: () => {
      // return authorization header with jwt token
      const token = localStorage.getItem("gozoneJWT");
      return token ? { Authorization: `Bearer ${token}` } : {};
    }
  }
};
