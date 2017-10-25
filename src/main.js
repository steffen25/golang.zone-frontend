// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Router from "vue-router";
import BootstrapVue from "bootstrap-vue";
import VueProgressBar from "vue-progressbar";
import Vue2Filters from "vue2-filters";
import VeeValidate from "vee-validate";

import App from "./App";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "font-awesome/css/font-awesome.css";

let originalVueComponent = Vue.component;
Vue.component = function(name, definition) {
  if (
    name === "bFormCheckboxGroup" ||
    name === "bCheckboxGroup" ||
    name === "bCheckGroup" ||
    name === "bFormRadioGroup"
  ) {
    definition.components = { bFormCheckbox: definition.components[0] };
  }
  originalVueComponent.apply(this, [name, definition]);
};

Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(Vue2Filters);
Vue.use(VeeValidate);
Vue.use(VueProgressBar, {
  color: "#19B5FE",
  failedColor: "#19B5FE",
  height: "5px"
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
