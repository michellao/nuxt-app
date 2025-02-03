import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
    const channel = getRouterParam(event, 'channel');
    const userMe = await event.$fetch('/api/users/@me');
    if (channel) {
        await mongoose.connect(useRuntimeConfig(event).mongodb);
        const pagination = await PaginationMessage.findOneAndDelete({ user_id: userMe?.id });
        if (pagination) {
            return true;
        } else {
            return false;
        }
    } else {
        throw createError({
            statusCode: 400,
        });
    }
});
