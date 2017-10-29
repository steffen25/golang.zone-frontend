import store from "../store";

export default {
  guest(to, from, next) {
    if (store.getters.isLoggedIn) {
      next();
    }
  },
  authUser(to, from, next) {
    if (!store.getters.isLoggedIn) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else if (
      (to.path === "/login" || to.path === "/register") &&
      store.getters.isLoggedIn
    ) {
      // Let's not allow a login or register transition if we're already logged in
      next("/");
    }

    next();
  },
  authAdmin(to, from, next) {
    if (!store.getters.isLoggedIn || !store.getters.isAdmin) {
      next("/");
    }
    next();
  }
};
