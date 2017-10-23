import Vue from "vue";
import Router from "vue-router";
import BootstrapVue from "bootstrap-vue";
import VueProgressBar from "vue-progressbar";
import HelloWorld from "@/components/HelloWorld";
import Posts from "@/components/Posts";
import Post from "@/components/Post";
import PageNotFound from "@/components/PageNotFound";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

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
Vue.use(VueProgressBar, {
  color: "#19B5FE",
  failedColor: "#19B5FE",
  height: "5px"
});

const scrollBehavior = to => {
  const position = {};
  if (to.hash) {
    position.selector = to.hash;
  }
  if (to.matched.some(mm => mm.meta.scrollToTop)) {
    position.x = 0;
    position.y = 0;
  }
  return position;
};

export default new Router({
  mode: "history",
  scrollBehavior,
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HelloWorld
    },
    {
      path: "/posts/:page(\\d+)?",
      name: "PostsPage",
      component: Posts,
      meta: { scrollToTop: true }
    },
    {
      path: "post/:slug?",
      name: "show.post",
      component: Post,
      meta: { scrollToTop: true }
    },
    {
      path: "/page-not-found",
      name: "PageNotFound",
      component: PageNotFound
    },
    {
      path: "*",
      redirect: "/page-not-found"
    }
  ]
});
