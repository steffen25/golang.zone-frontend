import {
    NavigationGuardNext,
    RouteLocationNormalized,
} from 'vue-router'
import { createPinia } from 'pinia'
import { useAuthStore, useUserStore } from '@/modules/user/store'

const pinia = createPinia()
const authStore = useAuthStore(pinia)
const userStore = useUserStore(pinia)

function adminGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    (!authStore.isLoggedIn || !userStore.isAdmin)
        ? next('/')
        : next()
}

export default adminGuard
