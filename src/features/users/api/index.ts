import { axios } from '@/lib/Axios';
import { UpdateProfileOptions, User } from '../types';

export const getUsers = async (): Promise<User[]> => {
  const { data: response } = await axios.get(`/users`);

  return response;
};

export const getUser = async (id: number): Promise<User> => {
  const { data: response } = await axios.get(`/users/${id}`);

  return response;
};

export const updateProfile = async ({ data }: UpdateProfileOptions) => {
  const { data: response } = await axios.patch(`/users/profile`, data);

  return response;
};
