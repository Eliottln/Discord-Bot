const mongoose = require('mongoose');

const warningSchema = new mongoose.Schema({
    guild_id: String,
    user_id: String,
    warning_list: [new mongoose.Schema({ reason: String, date: Date })],
});

module.exports = mongoose.model('Warning', warningSchema);