import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import posts from "./modules/posts";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

// import VuexActionLogger from "vuex-action-logger";
// Vue.use(VuexActionLogger(Vuex));

export default new Vuex.Store({
  modules: {
    auth,
    posts
  },
  strict: debug,
  plugins: []
});
