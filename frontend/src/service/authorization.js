import { getToken } from './token.js';

// eslint-disable-next-line import/prefer-default-export
export function checkAuth() {
  return !!getToken();
}
