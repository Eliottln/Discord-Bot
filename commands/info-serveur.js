const {EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");
const {parseTimestamp} = require("../utils/dateUtils");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info-serveur')
        .setDescription('Affiche des informations concernant le serveur.')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages + PermissionFlagsBits.UseApplicationCommands),
    execute(interaction) {
        let creationDate = parseTimestamp(interaction.guild.createdTimestamp)
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${interaction.guild.name}`)
            .addFields([
                {name: 'Créé le:', value: '<t:' + creationDate + ':d> (<t:' + creationDate + ':R>)'},
                {name: 'Nombre de membres', value: `${interaction.guild.memberCount}`},
            ])
            .setTimestamp();

        interaction.reply({embeds: [embed]});
    },
};