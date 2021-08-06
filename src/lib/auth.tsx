import { initReactQueryAuth } from 'react-query-auth';

import {
    login,
    getUserProfile,
    register,
    LoginCredentials,
    RegisterCredentials,
    AuthUser,
    UserResponse,
    logout,
} from '@/features/auth';
import storage from '@/utils/storage';

async function handleUserResponse(data: UserResponse) {
    const { tokens, user } = data;

    storage.set('access_token', tokens.accessToken);
    storage.set('refresh_token', tokens.refreshToken);

    return user;
}

async function loadUser() {
    return storage.get('access_token')
        ? await getUserProfile()
        : null;
}

async function loginFn(data: LoginCredentials) {
    const response = await login(data);
    const user: AuthUser = await handleUserResponse(response);

    return user;
}

async function registerFn(data: RegisterCredentials) {
    const response = await register(data);
    const user: AuthUser = await handleUserResponse(response);

    return user;
}

async function logoutFn() {
    await logout();

    storage.clear('access_token');
    storage.clear('refresh_token');

    window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
    loadUser,
    loginFn,
    registerFn,
    logoutFn,
    LoaderComponent() {
        return <> </>;
    },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
    AuthUser | null,
    unknown,
    LoginCredentials,
    RegisterCredentials
>(authConfig);
