import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
    const channel = getRouterParam(event, 'channel');
    const userMe = await event.$fetch('/api/users/@me');
    if (channel) {
        await mongoose.connect(useRuntimeConfig(event).mongodb);
        const pagination = await PaginationMessage.findOne({ user_id: userMe?.id }).exec();
        if (pagination) {
            return pagination.last_message_id;
        } else {
            throw createError({
                statusCode: 404,
            });
        }
    } else {
        throw createError({
            statusCode: 400,
        });
    }
});
