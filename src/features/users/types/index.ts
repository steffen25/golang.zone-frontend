import { BaseEntity } from '@/types';

export type User = {
  id: string;
  name: string;
  email: string;
  admin: boolean;
} & BaseEntity;

export type ProfileBody = {
  email: string;
  name: string;
};

export type UpdateProfileOptions = {
  data: ProfileBody;
};
