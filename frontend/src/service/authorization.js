import { getToken } from './token.js';

export function checkAuth() {
  return !!getToken();
}
