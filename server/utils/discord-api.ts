import { BASE_URI } from "~/composables/discord-api";
import { Channel, ChannelType, Message } from "~/composables/discord-types";

const fetchDiscordServer = async (uri: string, opts?: Parameters<typeof $fetch>[1]) => await $fetch(BASE_URI + uri, {
    headers: {
        authorization: `Bot ${useRuntimeConfig().discord.token}`,
    },
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

export async function getChannelMessages(channelId: string) {
    const data = await fetchDiscordServer(`/channels/${channelId}/messages`, {
        method: 'GET',
    });
    const parseMessages = Message.array().parse(data);
    return parseMessages;
}