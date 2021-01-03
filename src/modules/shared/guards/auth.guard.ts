import {
    NavigationGuardNext,
    RouteLocationNormalized,
} from 'vue-router'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/modules/user/store/auth.store'

const pinia = createPinia()
const authStore = useAuthStore(pinia)

function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    !authStore.isLoggedIn
        ? next({
            name: 'auth.login',
            query: { redirect: to.fullPath }
        })
        : next()
}

export default authGuard
