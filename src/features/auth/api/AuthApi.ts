import { axios } from '@/lib/Axios';
import {
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
  UserResponse,
} from '@/features/auth/types';

export const login = async (data: LoginCredentials): Promise<UserResponse> => {
  const { data: response } = await axios.post('/auth/login', data);

  return response;
};

export const register = async (data: RegisterCredentials): Promise<UserResponse> => {
  const { data: response } = await axios.post('/auth/register', data);

  return response;
};

export const logout = async (): Promise<unknown> => {
  const { data: response } = await axios.get('/auth/logout');

  return response;
};

export const getUserProfile = async (): Promise<AuthUser> => {
  const { data: response } = await axios.get('/auth/me');

  return response;
};
