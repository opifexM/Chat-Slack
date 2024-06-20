import { COOKIE_KEY_NAME } from '../const.js';
import { dropCookie, getCookie, saveCookie } from './cookie.js';

function getToken() {
  return getCookie(COOKIE_KEY_NAME);
}

function saveToken(token = '') {
  saveCookie(COOKIE_KEY_NAME, token);
}

function dropToken() {
  dropCookie(COOKIE_KEY_NAME);
}

export { getToken, saveToken, dropToken };
