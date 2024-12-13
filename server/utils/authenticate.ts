import { getUser } from "./discord-api";
import { type CookieType } from "./extract-cookies";

export const isAuth = async (cookiesAuth: CookieType) => {
    console.log(process.client);
    return typeof cookiesAuth["access-token"] === 'string' && typeof cookiesAuth["refresh-token"] === 'string' && (await getUser()) !== null;
};
