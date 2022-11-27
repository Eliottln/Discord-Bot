const {Events, EmbedBuilder} = require("discord.js");
const {generalChannelId} = require("../config.json");
const {parseTimestamp} = require("../utils/dateUtils");

module.exports = {
    name: Events.GuildScheduledEventCreate,
    once: false,
    async execute(guildScheduledEvent) {

        let startDate = parseTimestamp(guildScheduledEvent.scheduledStartTimestamp)
        let endDate = parseTimestamp(guildScheduledEvent.scheduledEndTimestamp)

        const embed = new EmbedBuilder()
            .setColor('#00fff7')
            .setTitle("Un nouvel événement a été posté, regarde ça !")
            .setFields([
                {name: `${guildScheduledEvent.name}`, value:`${guildScheduledEvent.description}`},
                {name: 'Début de l\'événement:', value: `<t:${startDate}:F>`},
                {name: 'Fin de l\'événement:', value: `<t:${endDate}:F>`}
            ]);

        const logChannel = guildScheduledEvent.client.channels.cache.get(generalChannelId);
        if (!logChannel) return console.warn("GuildScheduledEventCreate: Could not find channel");
        logChannel.send({content: '@everyone', embeds: [embed]});

    }
}