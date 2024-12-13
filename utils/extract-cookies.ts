import { CookieName, type CookieType } from "~/server/utils/extract-cookies";

export const extractCookieAuthenticate = (): CookieType => {
    let list: CookieType = {};
    Object.values(CookieName).forEach((cookieKey) => {
        const cookieValue = useCookie(cookieKey);
        if (cookieValue.value !== null) {
            list[cookieKey] = cookieValue.value;
        }
    });
    return list;
};
