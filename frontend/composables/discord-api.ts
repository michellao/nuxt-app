const BASE_URI = 'https://discord.com/api/v10';

const fetchDiscord = (uri: string, opts?: Parameters<typeof $fetch>[1]) => $fetch(BASE_URI + uri, {
    headers: {
        authorization: `${useCookie(CookieName.TokenType).value} ${useCookie(CookieName.AccessToken).value}`,
    },
    ...opts
});

export function user() {
    const response = fetchDiscord('/users/@me', {
        method: 'GET',
    });
}

export function messages() {
    const response = fetchDiscord('/', {
        method: 'POST',
    });
}