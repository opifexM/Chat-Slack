import axios from "axios";
import {BACKEND_REQUEST_TIMEOUT, BACKEND_URL} from "../const.js";
import {getToken} from "./token.js";

export function createAPI() {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: BACKEND_REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
  );

  return api;
}
