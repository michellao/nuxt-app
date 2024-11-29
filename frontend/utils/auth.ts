import type { CookieType } from "./extract-cookies";

export const isAuth = (cookiesAuth: CookieType) => {
    return typeof cookiesAuth["access-token"] === 'string' && typeof cookiesAuth["refresh-token"] === 'string'
        && typeof cookiesAuth["expires-in"] === 'string';
};
