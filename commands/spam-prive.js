const {SlashCommandBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");
const schedule = require("node-schedule");
const talkedRecently = new Set();

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

        if (talkedRecently.has(interaction.user.id)) {
            interaction.reply({
                content: `Tu ne peux utiliser cette commande qu'une fois par jour, réessaye demain`,
                ephemeral: true
            });
        } else {

            await interaction.reply({
                content: `${user} se fait spam en privé 🤡\nTu es fière de toi ?`,
                ephemeral: true
            });

            talkedRecently.add(interaction.user.id);
            const date = new Date();
            date.setDate(date.getDate() + 1)
            if (date.getHours() === 23 && date.getMinutes() === 59) {
                date.setHours(0, 1, 0, 0)
            } else {
                date.setHours(0, 0, 0, 0)
            }
            schedule.scheduleJob(date, () => {
                talkedRecently.delete(interaction.user.id);
            })

            const channel = interaction.client.channels.cache.get('1028364209039355904');
            if (!channel) return console.warn("log: Could not find channel");
            channel.send({content: `${interaction.user} a utilisé spam-privé sur ${user}`});

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
        }

    },
};