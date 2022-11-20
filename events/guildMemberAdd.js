const {Events, EmbedBuilder} = require("discord.js");
const {guildId, arrivalChannelId} = require('../config.json');

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    async execute(member) {
        const client = member.client
        const guild = member.guild;
        if (guild.id === guildId) {

            guild.invites.fetch().then(async guildInvites => {
                let inviter = 'Inconnu';

                guildInvites.each(invite => {
                    if (invite.uses !== client.invites[invite.code]) {
                        inviter = `<@!${invite.inviter.id}>`;

                        client.invites = []
                        guild.invites.fetch().then(guildInvites => {
                            guildInvites.each(guildInvite => {
                                client.invites[guildInvite.code] = guildInvite.uses;
                            })
                        })
                    }
                })

                const embed = new EmbedBuilder()
                    .setColor('#24e80b')
                    .setTitle('Nouvel(le) arrivant(e) !')
                    .setDescription(`${member} nous a rejoint !`)
                    .setThumbnail(`${member.user.avatarURL()}`)
                    .addFields([{name: 'Invité(e) par:', value: inviter}])
                    .setTimestamp();

                const logChannel = client.channels.cache.get(arrivalChannelId);
                if (!logChannel) return console.warn("GuildMemberAdd: Could not find channel");
                logChannel.send({embeds: [embed]});
            })
        }

    }
}