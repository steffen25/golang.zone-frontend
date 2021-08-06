
export type AuthUser = {
    id: string;
    email: string;
    name: string;
    admin: boolean;
};

export type LoginCredentials = {
    email: string;
    password: string;
};

export type LoginValues = {
    email: string;
    password: string;
};

export type LoginFormProps = {
    onSuccess: () => void;
};

export type RegisterCredentials = {
    email: string;
    password: string;
    name: string;
};

export type RegisterValues = {
    name: string;
    email: string;
    password: string;
};

export type RegisterFormProps = {
    onSuccess: () => void;
};

export type UserResponse = {
    tokens: Tokens;
    user: AuthUser;
}

export type Tokens = {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    tokenType: string;
}
