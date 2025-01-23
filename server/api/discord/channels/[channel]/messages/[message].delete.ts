import { deleteMessage } from "~/server/utils/discord-api";

export default defineEventHandler(async (event) => {
    const channel = getRouterParam(event, 'channel');
    const message = getRouterParam(event, 'message');
    if (channel && message) {
        await deleteMessage(channel, message);
    }
});
