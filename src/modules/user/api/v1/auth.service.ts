import { AxiosResponse } from 'axios'
import { httpClient } from '@/modules/shared/utils/http-client'
import {
    LoginCredentials,
    LoginResponse,
    LogoutResponse,
    RefreshTokenResponse,
    RegisterCredentials
} from '@/modules/user/models/auth.model'

class AuthService {
    async login(credentials: LoginCredentials): Promise<LoginResponse>
    {
        const response: AxiosResponse<LoginResponse> = await httpClient.post('auth/login', {
            email: credentials.email,
            password: credentials.password,
        })

        console.log(response)

        return response.data
    }

    async register(credentials: RegisterCredentials)
    {
        //
    }

    async refreshToken(): Promise<RefreshTokenResponse>
    {
        const response: AxiosResponse<RefreshTokenResponse> = await httpClient.get('auth/refresh')

        return response.data
    }

    async logout(): Promise<LogoutResponse>
    {
        const response: AxiosResponse<LogoutResponse> = await httpClient.get('auth/logout')

        return response.data
    }
}

export default new AuthService();