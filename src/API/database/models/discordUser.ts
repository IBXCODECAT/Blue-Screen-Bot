const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    discord_id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true }
});

export const DiscordUser = mongoose.model('DiscordUser', UserSchema);