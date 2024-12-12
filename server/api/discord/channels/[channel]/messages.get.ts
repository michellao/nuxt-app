export default defineEventHandler(async (event) => {
    const channel = getRouterParam(event, 'channel');
    if (channel) {
        const messages = await getChannelMessages(channel);
        return messages;
    } else {
        throw createError({
            statusCode: 400
        });
    }
});