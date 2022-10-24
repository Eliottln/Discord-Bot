const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
    guild_id: String,
    user_id: String,
    exp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    number_of_messages: { type: Number, default: 0 },
});

module.exports = mongoose.model('Level', levelSchema);