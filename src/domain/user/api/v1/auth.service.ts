import { AxiosResponse } from 'axios'
import { httpClient } from '@/domain/shared/utils/http-client'
import { LoginCredentials, LoginResponse, RegisterCredentials } from '@/domain/user/models/auth.model'

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

    async refreshTokens(): Promise<LoginResponse>
    {
        const response: AxiosResponse = await httpClient.get('auth/refresh')

        return response.data
    }
}

export default new AuthService();