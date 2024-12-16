import { type CookieType } from "~/utils/extract-cookies";

export const isAuth = async (cookiesAuth: CookieType) => {
    return typeof cookiesAuth["access-token"] === 'string' && typeof cookiesAuth["refresh-token"] === 'string' && await $fetch('/api/users/@me') !== null;
};
