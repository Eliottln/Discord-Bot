const {Events} = require("discord.js");

module.exports = {
    name: Events.GuildCreate,
    once: false,
    async execute(guild){
        if (await guild.client.getGuild(guild) == null) {
            await guild.client.createGuild(guild);
        }
        else {
            await guild.client.updateGuild(guild, {guild_id: guild.id, name: guild.name})
        }
    }
}