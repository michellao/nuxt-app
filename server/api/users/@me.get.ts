import { BASE_URI } from "~/composables/discord-api";
import { User } from "~/composables/discord-types";
import { CookieName } from "~/utils/extract-cookies";

export default defineEventHandler(async (event) => {
    try {
        const tokenType = getCookie(event, CookieName.TokenType);
        const accessToken = getCookie(event, CookieName.AccessToken);
        const data = await $fetch(BASE_URI + '/users/@me', {
            headers: {
                authorization: `${tokenType} ${accessToken}`,
            },
            method: 'GET',
        });
        const user = User.parse(data);
        return user;
    } catch (e) {
        setResponseStatus(event, 401);
        return null;
    }
});