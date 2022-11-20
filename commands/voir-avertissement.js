const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const {PermissionFlagsBits} = require("discord-api-types/v10");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('voir-avertissement')
        .setDescription('Affiche les avertissements pour un membre.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option =>
            option
                .setName('cible')
                .setDescription('Cible un membre')
                .setRequired(true)),
    async execute(interaction) {
        let user = interaction.options.getUser('cible');

        await interaction.client.getWarning(interaction.guild, user).then(doc => {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle(`Avertissement(s) de ${user.username}`);
            if (doc != null && doc.warning_list != null) {
                doc.warning_list.forEach(w => {
                    let date = Date.parse(w.date) / 1000;
                    date = Math.floor(date);
                    embed.addFields([{name: '<t:' + date + ':d>', value: w.reason}])
                })
            } else {
                embed.addFields([{name: 'Vide', value: 'Aucun avertissement'}])
            }

            interaction.reply({embeds: [embed], ephemeral: true})
        });
    },
};