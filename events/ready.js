const {Events} = require('discord.js');
const birthdays = require("../utils/birthdays");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        client.guilds.cache.each(async guild => {
            client.invites = []
            guild.invites.fetch().then(guildInvites => {
                guildInvites.each(guildInvite => {
                    client.invites[guildInvite.code] = guildInvite.uses;
                })
            })

            client.getBirthdays(guild).then(doc => {
                doc.forEach(date => {
                    birthdays.scheduleBday(date.day, date.month, date.year, date.username, client);
                })
            })
        });

    },
};
