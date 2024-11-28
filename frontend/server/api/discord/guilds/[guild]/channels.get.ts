export default defineEventHandler(async (event) => {
    const guildId = getRouterParam(event, 'guild');
    if (guildId) {
        const channels = await getGuildChannels(guildId);
        if (channels) {
            return channels;
        } else {
            throw createError({
                statusCode: 404,
            })
        }
    } else {
        throw createError({
            statusCode: 400,
        });
    }
});