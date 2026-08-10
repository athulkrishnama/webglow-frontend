import { env } from '../env';

export const API_ROUTES = {
  USER: {
    BASE: 'user',
    REGISTER: '/user/register',
    LOGIN: '/user/login',
    REFRESH_TOKEN: '/user/refresh-token',
  },
};

export const API_BASE_URL = env.VITE_API_URL;
