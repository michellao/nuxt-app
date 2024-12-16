import { BASE_URI } from "~/composables/discord-api";
import { User } from "~/composables/discord-types";
import { CookieName } from "~/utils/extract-cookies";

export default defineEventHandler(async (event) => {
    try {
        const data = await $fetch(BASE_URI + '/users/@me', {
            headers: {
                authorization: `${getCookie(event, CookieName.TokenType)} ${getCookie(event, CookieName.AccessToken)}`,
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