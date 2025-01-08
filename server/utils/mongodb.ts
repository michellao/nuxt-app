import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paginationSchema = new Schema({
    user_id: String,
    last_message_id: String,
});

const PaginationMessage = model('PaginationMessage', paginationSchema);

export { PaginationMessage };