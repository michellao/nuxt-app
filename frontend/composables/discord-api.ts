import { number, z } from "zod";
import { ChannelType, MessageType } from "./discord-types";

const BASE_URI = 'https://discord.com/api/v10';

const Discord = z.object({
    id: z.string(),
});

const User = Discord.extend({
    username: z.string(),
    global_name: z.string(),
    locale: z.string(),
});

const Channel = Discord.extend({
    type: z.nativeEnum(ChannelType),
    name: z.string(),
});

const Message = Discord.extend({
    timestamp: z.string().datetime(),
    edited_timestamp: z.nullable(z.string().datetime()),
    content: z.string(),
    type: z.nativeEnum(MessageType)
});

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
