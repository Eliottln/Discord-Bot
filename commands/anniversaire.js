const birthdays = require("../utils/birthdays");
const {EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");
const {birthdayChannelId} = require("../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anniversaire')
        .setDescription('Configure ta date de naissance.')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages + PermissionFlagsBits.UseApplicationCommands)
        .addIntegerOption(option =>
            option
                .setName('jour')
                .setDescription('Le jour du mois')
                .setRequired(true))
        .addIntegerOption(option =>
            option
                .setName('mois')
                .setDescription('Le mois')
                .setRequired(true)
                .addChoices(
                    {name: 'Janvier', value: 1},
                    {name: 'Février', value: 2},
                    {name: 'Mars', value: 3},
                    {name: 'Avril', value: 4},
                    {name: 'Mai', value: 5},
                    {name: 'Juin', value: 6},
                    {name: 'Juillet', value: 7},
                    {name: 'Août', value: 8},
                    {name: 'Septembre', value: 9},
                    {name: 'Octobre', value: 10},
                    {name: 'Novembre', value: 11},
                    {name: 'Décembre', value: 12},
                ))
        .addIntegerOption(option =>
            option
                .setName('année')
                .setDescription('L\'année')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.channelId === birthdayChannelId) {
            let day = interaction.options.getInteger('jour');
            let month = interaction.options.getInteger('mois');
            let year = interaction.options.getInteger('année');
            if (year < new Date().getFullYear() - 100 || year > new Date().getFullYear()) interaction.reply({
                content: 'Renseigne une année correcte.',
                ephemeral: true
            });
            switch (month) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    if (day < 1 || day > 31) interaction.reply({
                        content: 'Renseigne un jour correct.',
                        ephemeral: true
                    });
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    if (day < 1 || day > 30) interaction.reply({
                        content: 'Renseigne un jour correct.',
                        ephemeral: true
                    });
                    break;
                case 2:
                    if (day < 1 || day > 29) interaction.reply({
                        content: 'Renseigne un jour correct.',
                        ephemeral: true
                    });
            }

            await interaction.client.setBirthday(interaction.guild, interaction.user, day, month, year);
            birthdays.scheduleBday(day, month, year, interaction.user.username, interaction.client);

            if (day < 10) day = '0' + day;
            if (month < 10) month = '0' + month;
            const embed = new EmbedBuilder()
                .setColor('#d27a07')
                .setTitle(`${interaction.user.username} à enregistré sa date de naissance`)
                .addFields([{name: 'Né le:', value: day + '/' + month + '/' + year}])
                .setTimestamp();

            interaction.reply({embeds: [embed]});
        } else {
            interaction.reply({content: `Utilise cette commande dans le salon <#${birthdayChannelId}>`, ephemeral: true});
        }
    }
}