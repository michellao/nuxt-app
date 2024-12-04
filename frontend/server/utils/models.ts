import { Schema, model } from "mongoose";

const BotTokenSchema = new Schema({
    user_id: String,
    guild_id: String,
    user_access_token: String,
    user_refresh_token: String,
});

export const BotToken = model("bot_tokens", BotTokenSchema);