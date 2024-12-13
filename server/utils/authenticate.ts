import { type CookieType } from "./extract-cookies";

export const isAuth = async (cookiesAuth: CookieType) => {
    return typeof cookiesAuth["access-token"] === 'string' && typeof cookiesAuth["refresh-token"] === 'string';
};
