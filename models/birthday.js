const mongoose = require('mongoose');

const birthdaySchema = new mongoose.Schema({
    guild_id: String,
    user_id: String,
    username: String,
    day: String,
    month: String,
    year: String,
});

module.exports = mongoose.model('Birthday', birthdaySchema);