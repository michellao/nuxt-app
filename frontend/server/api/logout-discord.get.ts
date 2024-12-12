import { extractCookieAuthenticateFromServer } from "../utils/extract-cookies";

export default defineEventHandler(async (event) => {
    const cookies = extractCookieAuthenticateFromServer(event);
    const { discord } = useRuntimeConfig(event);
    if (typeof cookies['refresh-token'] === 'string') {
        const data = {
            token: cookies["refresh-token"],
            token_type_hint: 'refresh_token',
        };
        const dataEncoded = new URLSearchParams(data);
        const authorization = Buffer.from(`${discord.clientId}:${discord.clientSecret}`).toString('base64');
        const response = await $fetch('https://discord.com/api/oauth2/token/revoke', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${authorization}`,
            },
            body: dataEncoded.toString(),
        });
    }
    for (const key of Object.keys(cookies)) {
        deleteCookie(event, key);
    };
    await sendRedirect(event, '/');
});
