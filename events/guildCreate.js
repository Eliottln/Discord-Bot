const {Events} = require("discord.js");

module.exports = {
    name: Events.GuildCreate,
    once: false,
    async execute(guild) {
        await guild.client.updateGuild(guild)
    }
}