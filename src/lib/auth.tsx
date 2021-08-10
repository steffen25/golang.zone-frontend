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
import { useAuthStore } from '@/hooks/useAuth';

const setUser = useAuthStore.getState().setUser;

async function handleUserResponse(data: UserResponse) {
  const { tokens, user } = data;

  setUser(user);

  storage.set('access_token', tokens.accessToken);
  storage.set('refresh_token', tokens.refreshToken);

  return user;
}

async function loadUser() {
  if (storage.get('access_token')) {
    const user = await getUserProfile();

    setUser(user);
  }

  return null;
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

  setUser(null);

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
