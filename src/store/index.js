import Vue from "vue";
import Vuex from "vuex";
import VuexActionLogger from "vuex-action-logger";
import auth from "./modules/auth";

Vue.use(Vuex);
Vue.use(VuexActionLogger(Vuex));
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    auth
  },
  strict: debug,
  plugins: []
});
