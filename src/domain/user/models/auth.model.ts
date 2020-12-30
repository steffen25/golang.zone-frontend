import { User } from "@/domain/user/models/user.model";

export interface LoginCredentials {
    email: string,
    password: string,
}

export interface RegisterCredentials {
    name: string,
    email: string,
    password: string,
}

export interface Tokens {
    accessToken: string,
    expiresIn: number,
    refreshToken: string,
    tokenType: string,
}

export interface LoginResponse {
    data: {
        tokens: Tokens,
        user: User,
    }
    message: String,
    success: Boolean,
}
