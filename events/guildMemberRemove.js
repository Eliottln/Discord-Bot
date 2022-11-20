const {Events, EmbedBuilder} = require("discord.js");
const {guildId, arrivalChannelId} = require('../config.json');

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,
    async execute(client, member) {
        if (member.guild.id === guildId) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle(`Oh... ${member.name} nous a quitté :(`)
                .setDescription('Tu vas nous manquer ! (Ou pas ?? 🤔')
                .setThumbnail(`${member.user.avatarURL()}`)
                .setTimestamp();

            const logChannel = client.channels.cache.get(arrivalChannelId);
            if (!logChannel) return console.warn("GuildMemberRemove: Could not find channel");
            logChannel.send({embeds: [embed]});
        }
    }
}