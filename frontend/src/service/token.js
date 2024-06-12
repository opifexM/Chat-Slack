import { AUTH_TOKEN_KEY_NAME } from '../const.js';
import { dropCookie, getCookie, saveCookie } from './cookie.js';

function getToken() {
  return getCookie(AUTH_TOKEN_KEY_NAME);
}

function saveToken(token = '') {
  saveCookie(AUTH_TOKEN_KEY_NAME, token);
}

function dropToken() {
  dropCookie(AUTH_TOKEN_KEY_NAME);
}

export { getToken, saveToken, dropToken };
