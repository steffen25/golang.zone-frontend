import Vue from "vue";
import Router from "vue-router";
import Guard from "./guard";

// import our views
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Logout from "@/views/Logout";
import Posts from "@/views/Posts";
import CreatePost from "@/views/createPost";
import UpdatePost from "@/views/updatePost";
import Profile from "@/views/Profile";
import Post from "@/views/Post";
import Dashboard from "@/views/Dashboard";
import PageNotFound from "@/views/PageNotFound";

const router = new Router({
  mode: "history",
  scrollBehavior,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: Guard.authUser
    },
    /**
     * Auth Routes
     */
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/@:name",
      name: "Profile",
      component: Profile
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/logout",
      name: "Logout",
      component: Logout
    },
    /**
     * Posts
     */
    {
      path: "/posts/:page(\\d+)?",
      name: "index.posts",
      component: Posts,
      meta: {
        scrollToTop: true
      }
    },
    {
      path: "/post/create",
      name: "create.post",
      component: CreatePost,
      beforeEnter: Guard.authAdmin
    },
    {
      path: "/post/:slug/update",
      name: "update.post",
      component: UpdatePost,
      beforeEnter: Guard.authAdmin
    },
    {
      path: "/post/:slug?",
      name: "show.post",
      component: Post
    },
    /**
     * Error pages
     */
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

export default router;
