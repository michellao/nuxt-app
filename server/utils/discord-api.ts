import { BASE_URI } from "~/composables/discord-api";
import { Channel, ChannelType, Message } from "~/composables/discord-types";

const fetchDiscordServer = async (uri: string, opts?: Parameters<typeof $fetch>[1]) => await $fetch(BASE_URI + uri, {
        headers: {
            authorization: `Bot ${useRuntimeConfig().discord.token}`,
        },
        /* onRequestError: error => {
            console.log("onRequestError:");
            console.log(error);
        }, */
        /* onRequest: request => {
            console.log("onRequest:");
            console.log(request);
        }, */
        /* onResponse: response => {
            console.log("onResponse:");
            console.log(response);
        },
        onResponseError: response => {
            console.log("onResponseError:");
            console.log(response);
        }, */
    ...opts
});

export async function getGuildChannels(guildId: string) {
    const data = await fetchDiscordServer(`/guilds/${guildId}/channels`, {
        method: 'GET',
    });
    const parseChannels = Channel.array().parse(data).filter(c =>
        c.type === ChannelType.GUILD_TEXT || c.type === ChannelType.GUILD_VOICE || c.type === ChannelType.DM
        || c.type === ChannelType.PRIVATE_THREAD || c.type === ChannelType.PUBLIC_THREAD
    );
    return parseChannels;
}

export async function getChannelMessages(channelId: string, queryOptions?: { before?: string, after?: string }) {
    const data = await fetchDiscordServer(`/channels/${channelId}/messages`, {
        method: 'GET',
        query: {
            limit: 25,
            ...queryOptions,
        },
    });
    const parseMessages = Message.array().parse(data);
    return parseMessages;
}

export async function deleteMessage(channelId: string, messageId: string) {
    const data = await fetchDiscordServer(`/channels/${channelId}/messages/${messageId}`, {
        method: 'DELETE',
    });
    return data;
}
