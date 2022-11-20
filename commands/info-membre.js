const {EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");
const {guildId} = require("../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info-membre')
        .setDescription('Affiche des informations concernant un membre.')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages && PermissionFlagsBits.UseApplicationCommands)
        .addUserOption(option =>
            option
                .setName('cible')
                .setDescription('Cible un membre')),
    execute(interaction) {
        const client = interaction.client
        const user = interaction.options.getUser('cible') ?? interaction.user;
        const member = interaction.guild.members.cache.get(user.id)

        let joinedTimestamp = parseInt(member.joinedTimestamp) / 1000;
        joinedTimestamp = Math.floor(joinedTimestamp);

        if (!user.bot && interaction.guildId === guildId) {
            client.getLevel(interaction.guild, user).then(async levelData => {
                let userLevel = {}
                if (levelData == null) {
                    await client.createLevel(interaction.guild, user)
                    userLevel.level = 1
                    userLevel.exp = 0
                } else {
                    userLevel = levelData
                }
                const nxtLvl = 80 * (Math.pow(2, userLevel.level) - 1);

                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle(`Infos de ${user.username}`)
                    .setDescription(`${user}`)
                    .setThumbnail(`${user.avatarURL()}`)
                    .addFields([
                        {name: 'Tag:', value: `${user.tag}`},
                        {
                            name: 'Membre depuis le:',
                            value: '<t:' + joinedTimestamp + ':d> (<t:' + joinedTimestamp + ':R>)'
                        },
                        {name: `Niveau ${userLevel.level} 📈`, value: `Prochain niveau (${userLevel.exp}/${nxtLvl})`},
                        {name: 'Rôles:', value: member.roles.cache.map(role => `${role}`).join(' ')},
                    ])
                    .setTimestamp();

                interaction.reply({embeds: [embed]});
            });
        } else {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`Infos de ${user.username}`)
                .setDescription(`<@!${user.id}>`)
                .setThumbnail(`${user.avatarURL()}`)
                .addFields([
                    {name: 'Tag:', value: `${user.tag}`},
                    {
                        name: 'Membre depuis le:',
                        value: '<t:' + joinedTimestamp + ':d> (<t:' + joinedTimestamp + ':R>)'
                    },
                    {name: 'Rôles:', value: member.roles.cache.map(role => `${role}`).join(' ')},
                ])
                .setTimestamp();

            interaction.reply({embeds: [embed]});
        }

    },
};