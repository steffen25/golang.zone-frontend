import { defineStore } from 'pinia'
import authService from '@/modules/user/api/v1/auth.service'
import { LoginCredentials } from '@/modules/user/models/auth.model'
import cookies from 'js-cookie'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isLoading: false as Boolean,
    }),
    getters: {
        accessToken(): string | undefined {
            return cookies.get('x-access-token')
        },

        isLoggedIn(): Boolean {
            return !!cookies.get('x-access-token')
        }
    },
    actions: {
        async setToken(token: string, expiresIn: number) {
            const expiryTime: Date = new Date(new Date().getTime() + expiresIn * 1000);

            cookies.set('x-access-token', token, { expires: expiryTime });
        },

        async refreshToken() {
            try {
                const refreshTokenResponse = await authService.refreshToken()
                const accessToken = refreshTokenResponse.data.accessToken
                const expiresIn = refreshTokenResponse.data.expiresIn

                this.setToken(accessToken, expiresIn)
            } catch (error) {
                console.error(error)
            }
        },

        async login(email: string, password: string) {
            try {
                this.isLoading = true
                const credentials: LoginCredentials = { email, password }

                const loginResponse = await authService.login(credentials)
                const accessToken = loginResponse.data.tokens.accessToken
                const expiresIn = loginResponse.data.tokens.expiresIn

                this.setToken(accessToken, expiresIn)
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },

        async logout() {
            try {
                this.isLoading = true

                const logoutResponse = await authService.logout()

                cookies.remove('x-access-token')

                console.log(logoutResponse)
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false
            }
        }
    },
})
