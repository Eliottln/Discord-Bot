const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const {PermissionFlagsBits} = require("discord-api-types/v10");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avertissement')
        .setDescription('Donne un avertissement à un membre avec un motif.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option =>
            option
                .setName('cible')
                .setDescription('Cible un membre')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('motif')
                .setDescription('Motif de l\'avertissement')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('cible');
        if (user.bot) return interaction.reply({content: 'Un bot ne peut pas avoir d\'avertissements', ephemeral: true})
        const client = interaction.client
        const message = interaction.options.getString('motif');

        await client.addWarning(interaction.guild, user, {reason: message, date: new Date()}).then(doc => {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle(`${user.username} a reçu un avertissement...`)
                .setThumbnail(`${user.avatarURL()}`)
                .addFields([
                    {name: 'Pour le motif suivant :', value: message},
                    {name: `Attention ${user.username}`, value: `Tu as ${doc.warning_list.length} avertissement(s)`},
                ])
                .setTimestamp();

            interaction.reply({content: `${user}`, embeds: [embed]})
        });
    },
};