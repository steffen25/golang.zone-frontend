import {
    createRouter,
    createWebHistory,
    RouteRecordRaw
} from 'vue-router'
import postRoutes from '@/modules/post/routes/post.routes'
import authRoutes from '@/modules/user/routes/auth.routes'
import userRoutes from '@/modules/user/routes/user.routes'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    },
    ...authRoutes,
    ...userRoutes,
    ...postRoutes,
    {
        path: '/:path(.*)',
        component: () => import(/* webpackChunkName: "404" */ '@/views/errors/404.vue'),
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
