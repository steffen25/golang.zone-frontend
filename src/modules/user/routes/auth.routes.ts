import { RouteRecordRaw } from 'vue-router'
import { guestGuard } from '@/modules/shared/guards'

const authRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'auth.login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue'),
        beforeEnter: guestGuard,
    },
    {
        path: '/register',
        name: 'auth.register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/auth/Register.vue'),
        beforeEnter: guestGuard,
    },
]

export default authRoutes