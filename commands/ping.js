const {SlashCommandBuilder} = require('discord.js');
const {PermissionFlagsBits} = require("discord-api-types/v10");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages + PermissionFlagsBits.UseApplicationCommands),
    async execute(interaction) {
        await interaction.reply(`Pong!\nWebsocket heartbeat: \`${interaction.client.ws.ping}\`ms.`);
    },
};
