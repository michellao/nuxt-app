export default defineEventHandler(async (event) => {
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
        /* const response = await $fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${discord.authorization}`
            },
            body: dataEncoded.toString(),
        }); */
        return dataEncoded.toString();
    }
    throw createError({
        statusCode: 400,
        statusMessage: 'Missing a code from Discord OAuth2'
    });
})