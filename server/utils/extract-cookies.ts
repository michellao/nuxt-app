import { CookieName } from "~/utils/extract-cookies";
import type { CookieType } from "~/utils/extract-cookies";

export const extractCookieAuthenticateFromServer = (event: Parameters<typeof getCookie>[0]) => {
    let list: CookieType = {};
    Object.values(CookieName).forEach((cookieKey) => {
        const cookieValue = getCookie(event, cookieKey);
        list[cookieKey] = cookieValue;
    });
    return list;
};
