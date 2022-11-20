const {SlashCommandBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spam-prive')
        .setDescription('Spam un membre en privé (à utiliser avec précaution).')
        .setDefaultMemberPermissions(PermissionFlagsBits.UseApplicationCommands)
        .addUserOption(option =>
            option
                .setName('cible')
                .setDescription('Cible un membre')
                .setRequired(true)),
    async execute(interaction) {
        let user = interaction.options.getUser('cible');

        if (user.bot) {
            return await interaction.reply({content: "Pas le bot ! Un utilisateur c'est mieux.", ephemeral: true});
        }

        await interaction.reply({content: `${user} se fait spam en privé 🤡\nTu es fière de toi ?`, ephemeral: true});

        await user.send("Salut");
        await user.send("Je m'adresse à toi car une personne a décidé de te spam");
        await user.send("Je n'en connais pas la raison");
        await user.send("Le but est simplement de t'envoyer plein de messages :)");
        await user.send("C'est peut-être juste pour t'embêter");
        await user.send("Mais peu m'importe");
        await user.send("Je m'en fiche");
        await user.send("Je te laisse faire ton enquête si tu veux");
        await user.send("Ça fait beaucoup de messages");
        await user.send("C'est cadeau");
        await user.send("Et c\'est le but");
        await user.send("Ne m'en veux pas");
        await user.send("Allez, la bise");
        await user.send("Et j'espère t'avoir dérangé");

    },
};