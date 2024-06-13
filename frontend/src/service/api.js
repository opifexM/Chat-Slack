import axios from 'axios';
import { BACKEND_REQUEST_TIMEOUT } from '../const.js';
import { getToken } from './token.js';

// eslint-disable-next-line import/prefer-default-export
export function createAPI() {
  const api = axios.create({
    timeout: BACKEND_REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token && config.headers) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
  );

  return api;
}
