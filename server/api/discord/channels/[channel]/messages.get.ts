export default defineEventHandler(async (event) => {
    const channel = getRouterParam(event, 'channel');
    const userMe = await event.$fetch('/api/users/@me');
    if (channel) {
        const messages = await getChannelMessages(channel);
        return messages.filter(m => m.author.id === userMe?.id);
    } else {
        throw createError({
            statusCode: 400
        });
    }
});