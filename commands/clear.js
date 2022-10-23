const {SlashCommandBuilder} = require('discord.js');
const {PermissionFlagsBits} = require("discord-api-types/v10");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Efface un certain nombre de messages.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages && PermissionFlagsBits.UseApplicationCommands)
        .addIntegerOption(option =>
            option
                .setName('nombre')
                .setDescription('Nombre de message à supprimer.')
                .setRequired(true))
        .addUserOption(option =>
            option
                .setName('cible')
                .setDescription('Cibler un utilisateur')),
    async execute(interaction) {
        const amountToDelete = interaction.options.getInteger('nombre');
        if (amountToDelete < 1 || amountToDelete > 100) {
            return await interaction.reply({
                content: 'Le nombre de messages doit être compris entre 1 et 100, réessaye !',
                ephemeral: true
            });
        }
        const target = interaction.options.getUser('cible');

        if (target) {

            const messageToDelete = await interaction.channel.messages.fetch();

            let i = 0;
            const filterTargetMessages = [];
            (await messageToDelete).filter(msg => {
                if (msg.author === target && amountToDelete > i) {
                    filterTargetMessages.push(msg);
                    i++;
                }
            });

            await interaction.channel.bulkDelete(filterTargetMessages, true).then(messages => {
                interaction.reply(`${interaction.user} a supprimé ${messages.size} message(s) de ${target}.`)
            });
        } else {
            await interaction.channel.bulkDelete(amountToDelete, true).then(messages => {
                interaction.reply(`${interaction.user} a supprimé ${messages.size} message(s) sur ce salon.`)
            });
        }

    },
};