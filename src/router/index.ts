import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    },
    {
        path: '/login',
        name: 'auth.login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue'),
    },
    {
        path: '/register',
        name: 'auth.register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/auth/Register.vue'),
    },
    {
        path: '/posts',
        name: 'post.index',
        component: () => import(/* webpackChunkName: "posts" */ '@/views/post/PostIndex.vue'),
    },
    {
        path: '/posts/:id',
        name: 'post.show',
        component: () => import(/* webpackChunkName: "post" */ '@/views/post/PostIndex.vue'),
    },
    {
        path: '/:path(.*)',
        component: () => import(/* webpackChunkName: "404" */ '@/views/errors/404.vue'),
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
