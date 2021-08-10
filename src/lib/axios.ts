import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor, { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';
import storage from '@/utils/storage';
import { Notification, useNotificationStore } from '@/hooks/useNotificationStore';
import config from '@/config';
import { Tokens } from '@/features/auth/types';
import { logout } from '@/features/auth/api';

export const axios = Axios.create({
  baseURL: config.apiUrl,
  headers: {
    Accept: 'application/json',
  },
});

const refreshAuthLogic = (failedRequest: any) => {
  const config: AxiosAuthRefreshRequestConfig = {
    skipAuthRefresh: false,
  };

  const body = {
    refreshToken: storage.get('refresh_token'),
  };

  return axios
    .post('/auth/token/refresh', body, config)
    .then(({ data: tokens }: AxiosResponse<Tokens>) => {
      storage.set('access_token', tokens.accessToken);
      storage.set('refresh_token', tokens.refreshToken);

      return Promise.resolve();
    })
    .catch((error: AxiosError) => {
      storage.clear('access_token');
      storage.clear('refresh_token');

      logout().then((_) => {
        window.location.href = '/auth/login';
      });

      return Promise.reject();
    });
};

createAuthRefreshInterceptor(axios, refreshAuthLogic, {
  pauseInstanceWhileRefreshing: true,
});

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.get('access_token');

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
}

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    const request = error.config;
    const message = error.response?.data?.message || error.message;

    if ((request as AxiosAuthRefreshRequestConfig)?.skipAuthRefresh) {
      return Promise.reject(error);
    }

    if (error?.response?.status === 401) {
      return axios(request);
    }

    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    } as Notification);

    return Promise.reject(error);
  }
);
