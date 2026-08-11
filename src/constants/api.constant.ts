import { env } from '../env';

export const API_ROUTES = {
  USER: {
    BASE: 'user',
    REGISTER: '/user/register',
    LOGIN: '/user/login',
    REFRESH_TOKEN: '/user/refresh-token',
  },
  PROVIDER_SERVICE: {
    BASE: 'provider-service',
    CREATE: '/provider-service',
    MY_SERVICES: '/provider-service/my',
    ADMIN_SERVICES: '/provider-service/admin',
    BROWSE: '/provider-service/browse',
    GET_ONE: (id: string) => `/provider-service/${id}`,
    UPDATE: (id: string) => `/provider-service/${id}`,
  },
};

export const API_BASE_URL = env.VITE_API_URL;
