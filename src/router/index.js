import Vue from "vue";
import Router from "vue-router";

import { requireAuth, isLoggedIn } from "../service/authService";

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
      meta: {
        requiresAuth: true
      }
    },
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
    {
      path: "/posts/:page(\\d+)?",
      name: "index.posts",
      component: Posts,
      meta: {
        scrollToTop: true,
        requiresAuth: true
      }
    },
    {
      path: "/post/create",
      name: "create.post",
      component: CreatePost,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/post/:slug/update",
      name: "update.post",
      component: UpdatePost,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/post/:slug?",
      name: "show.post",
      component: Post
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

router.beforeEach((to, from, next) => {
  // check the meta field
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check if the user is authenticated
    if (!isLoggedIn()) {
      // user isnt authenticated redirect to login
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      // the next method allow the user to continue to the router
      next();
    }
  } else {
    // the next method allow the user to continue to the router
    next();
  }
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
