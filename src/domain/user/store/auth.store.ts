import { defineStore } from 'pinia'
import authService from '@/domain/user/api/v1/auth.service'
import { LoginCredentials } from '@/domain/user/models/auth.model'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isLoggedIn: false as Boolean,
        isLoading: false as Boolean,
    }),
    getters: {},
    actions: {
        async login(email: string, password: string)
        {
            try {
                this.isLoading = true
                const credentials: LoginCredentials = { email, password }

                const loginResponse = await authService.login(credentials)

                console.log(loginResponse)
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false
            }
        }
    },
})
