import mongoose from "mongoose";
import { PaginationMessage } from "~/server/utils/mongodb";

export default defineEventHandler(async (event) => {
    const channel = getRouterParam(event, 'channel');
    const userMe = await event.$fetch('/api/users/@me');
    if (channel) {
        const messages = await getChannelMessages(channel);
        const lastMessage = messages[messages.length - 1];
        await mongoose.connect(useRuntimeConfig(event).mongodb);
        const pagination = new PaginationMessage({
            user_id: userMe?.id,
            last_message_id: lastMessage.id,
        });
        pagination.save();
        return messages.filter(m => m.author.id === userMe?.id);
    } else {
        throw createError({
            statusCode: 400
        });
    }
});