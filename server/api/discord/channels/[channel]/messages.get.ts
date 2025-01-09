import mongoose from "mongoose";
import { PaginationMessage } from "~/server/utils/mongodb";

export default defineEventHandler(async (event) => {
    const channel = getRouterParam(event, 'channel');
    const userMe = await event.$fetch('/api/users/@me');
    if (channel) {
        const messages = await getChannelMessages(channel, getQuery(event));
        const lastMessage = messages[messages.length - 1];
        await mongoose.connect(useRuntimeConfig(event).mongodb);
        const searchObj = {
            user_id: userMe?.id,
            last_message_id: lastMessage.id,
        };
        const pagination = await PaginationMessage.exists(searchObj);
        if (pagination === null) {
            await PaginationMessage.deleteMany({ user_id: userMe?.id });
            PaginationMessage.create(searchObj);
        }
        return messages.filter(m => m.author.id === userMe?.id);
    } else {
        throw createError({
            statusCode: 400
        });
    }
});
