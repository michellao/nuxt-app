export const BASE_URI = 'https://discord.com/api/v10';

const fetchDiscord = async (uri: string, opts?: Parameters<typeof useFetch>[1]) => await useFetch(BASE_URI + uri, {
    headers: {
        authorization: `${useCookie(CookieName.TokenType).value} ${useCookie(CookieName.AccessToken).value}`,
    },
    ...opts
});

export async function getUser() {
    const { data, error, clear, status, refresh } = await fetchDiscord('/users/@me', {
        method: 'GET',
    });
    try {
        const parseUser = User.parse(data.value);
        return parseUser;
    } catch {
        return null;
    }
}

export async function getMessages() {
    const { data, error, clear, status, refresh } = await fetchDiscord('/channels/', {
        method: 'GET',
        query: {
            limit: 100,
        }
    });
    try {
        const parseMessages = Message.parse(data.value);
        return parseMessages;
    } catch {
        return null;
    }
}

export async function getUserGuilds() {
    const { data, error, clear, status, refresh } = await fetchDiscord('/users/@me/guilds', {
        method: 'GET',
    });
    try {
        const parseGuilds = Guild.array().parse(data.value);
        return parseGuilds;
    } catch {
        return null;
    };
}
