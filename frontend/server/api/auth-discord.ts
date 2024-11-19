import { z } from "zod";

export default defineEventHandler(async (event) => {
    const Oauth2Response = z.object({
        access_token: z.string(),
        token_type: z.string(),
        expires_in: z.number(),
        refresh_token: z.string(),
        scope: z.string()
    });
    const query = getQuery(event);
    const { discord } = useRuntimeConfig(event);
    const code = query.code;
    if (code && typeof code === 'string') {
        const data = {
            'grant_type': 'authorization_code',
            'client_id': discord.clientId,
            code: code,
            'redirect_uri': 'http://localhost:3000/api/auth-discord'
        };
        const dataEncoded = new URLSearchParams(data);
        const response = await $fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${discord.authorization}`
            },
            body: dataEncoded.toString(),
        })
        .catch((reason) => {
            console.log(reason);
        });
        const parsedOauth2 = Oauth2Response.safeParse(response);
        if (parsedOauth2.success) {
            const data = parsedOauth2.data;
            setCookie(event, 'access-token', data.access_token);
            setCookie(event, 'refresh-token', data.refresh_token);
            setCookie(event, 'expires-in', String(Date.now() + data.expires_in));
        }
        return dataEncoded.toString();
    }
    throw createError({
        statusCode: 400,
        statusMessage: 'Missing a code from Discord OAuth2'
    });
})