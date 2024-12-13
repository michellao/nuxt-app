import { BASE_URI } from "~/composables/discord-api";

export default defineEventHandler(async (event) => {
    const data = $fetch(BASE_URI + '/users/@me', {
        headers: {
            authorization: `${getCookie(event, CookieName.TokenType)} ${getCookie(event, CookieName.AccessToken)}`,
        },
        method: 'GET',
    });
    return data;
});