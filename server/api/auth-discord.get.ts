import type { CookieOptions } from "nuxt/app";
import { z } from "zod";
import { CookieName } from "../utils/extract-cookies";

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
            code: code,
            'redirect_uri': 'http://localhost:3000/api/auth-discord'
        };
        const dataEncoded = new URLSearchParams(data);
        const authorization = Buffer.from(`${discord.clientId}:${discord.clientSecret}`).toString('base64');
        const response = await $fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${authorization}`
            },
            body: dataEncoded.toString(),
        })
        .catch((reason) => {
            console.log(reason);
        });
        const parsedOauth2 = Oauth2Response.safeParse(response);
        if (parsedOauth2.success) {
            const data = parsedOauth2.data;
            const cookieOption: CookieOptions = {};
            setCookie(event, CookieName.AccessToken, data.access_token, cookieOption);
            setCookie(event, CookieName.RefreshToken, data.refresh_token, cookieOption);
            setCookie(event, CookieName.ExpiresIn, String(Date.now() / 1000 + data.expires_in), cookieOption);
            setCookie(event, CookieName.TokenType, data.token_type);
            setCookie(event, CookieName.Scope, data.scope);
        } else {
            throw createError({
                statusCode: 401,
                statusMessage: 'Error login to Discord'
            });
        }
        await sendRedirect(event, '/');
    }
    throw createError({
        statusCode: 400,
        statusMessage: 'Missing a code from Discord OAuth2'
    });
})
