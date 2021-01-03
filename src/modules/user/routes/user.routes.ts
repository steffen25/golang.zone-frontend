import { RouteRecordRaw } from 'vue-router'
import { authGuard } from '@/modules/shared/guards'

const userRoutes: Array<RouteRecordRaw> = [
    {
        path: '/profile',
        name: 'user.profile',
        component: () => import(/* webpackChunkName: "user.profile" */ '@/views/auth/Login.vue'),
        beforeEnter: authGuard,
    },
]

export default userRoutes