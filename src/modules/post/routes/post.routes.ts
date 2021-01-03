import { RouteRecordRaw } from 'vue-router'

const postRoutes: Array<RouteRecordRaw> = [
    {
        path: '/posts/:page(\\d+)?',
        name: 'post.index',
        component: () => import(/* webpackChunkName: "post.index" */ '@/views/post/PostIndex.vue'),
        meta: {
            requiresAuth: true as Boolean,
        },
    },
    {
        path: '/posts/create',
        name: 'post.create',
        component: () => import(/* webpackChunkName: "post.create" */ '@/views/post/PostIndex.vue'),
        meta: {
            requiresAuth: true as Boolean,
        },
    },
    {
        path: '/posts/:id/update',
        name: 'post.update',
        component: () => import(/* webpackChunkName: "post.update" */ '@/views/post/PostIndex.vue'),
        meta: {
            requiresAuth: true as Boolean,
        },
    },
    {
        path: '/posts/:id',
        name: 'post.show',
        component: () => import(/* webpackChunkName: "post.show" */ '@/views/post/PostIndex.vue'),
        meta: {
            requiresAuth: true as Boolean,
        },
    },
]

export default postRoutes