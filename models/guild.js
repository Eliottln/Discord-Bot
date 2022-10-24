const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guild_id: String,
    name: String,
    joined_date: { type: Date, default: new Date() },
});

module.exports = mongoose.model('Guild', guildSchema);