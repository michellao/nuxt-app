export const BASE_URI = 'https://discord.com/api/v10';

export const fetchDiscord = async (uri: string, opts?: Parameters<typeof $fetch>[1]) => await $fetch(BASE_URI + uri, {
    headers: {
        authorization: `${useCookie(CookieName.TokenType).value} ${useCookie(CookieName.AccessToken).value}`,
    },
    ...opts
});

export async function getMessages() {
    const data = await fetchDiscord('/channels/', {
        method: 'GET',
        query: {
            limit: 100,
        }
    });
    try {
        const parseMessages = Message.array().parse(data);
        return parseMessages;
    } catch {
        return [];
    }
}

export async function getUserGuilds() {
    const data = await fetchDiscord('/users/@me/guilds', {
        method: 'GET',
    });
    try {
        const parseGuilds = Guild.array().parse(data);
        return parseGuilds;
    } catch {
        return [];
    }
}
