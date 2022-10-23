const {EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('auto-roles')
        .setDescription('Génère les embeds pour les auto-roles.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {

        await interaction.reply({content: 'Sélectionne la bonne commande', ephemeral: true});

        let embedAge = new EmbedBuilder()
            .setColor('#d0c61c')
            .setTitle('Ton âge 😛')
            .setDescription(
                '👶 | -18\n' +
                '🧒 | 18 - 20\n' +
                '🧑 | 21-23\n' +
                '🧓 | 24-26\n' +
                '👴 | 27-29\n' +
                '💀 | 30+'
            )
        let pollAge = await interaction.channel.send({embeds: [embedAge], fetchReply: true});
        await pollAge.react('👶');
        await pollAge.react('🧒');
        await pollAge.react('🧑');
        await pollAge.react('🧓');
        await pollAge.react('👴');
        await pollAge.react('💀');

        let embedDijon = new EmbedBuilder()
            .setColor('#d0c61c')
            .setTitle('Tu connais Dijon ? 🤔')
            .setDescription(
                '😉 | Oui\n' +
                '😶 | Un peu\n' +
                '🙁 | Non'
            )
        let pollDijon = await interaction.channel.send({embeds: [embedDijon], fetchReply: true});
        await pollDijon.react('😉');
        await pollDijon.react('😶');
        await pollDijon.react('🙁');

        let embedGender = new EmbedBuilder()
            .setColor('#d0c61c')
            .setTitle('Ton genre ❓')
            .setDescription(
                '🚹 | Homme\n' +
                '🚺 | Femme\n' +
                '🚻 | Genderfluid\n' +
                '🏳️‍🌈 | Non-binaire'
            )
        let pollGender = await interaction.channel.send({embeds: [embedGender], fetchReply: true});
        await pollGender.react('🚹');
        await pollGender.react('🚺');
        await pollGender.react('🚻');
        await pollGender.react('🏳️‍🌈');

        let embedSituation = new EmbedBuilder()
            .setColor('#d0c61c')
            .setTitle('Ta situation professionnelle 🙃')
            .setDescription(
                '🤓 | Étudiant(e)\n' +
                '💸 | Vie active\n' +
                '🧐 | En recherche'
            )
        let pollSituation = await interaction.channel.send({embeds: [embedSituation], fetchReply: true});
        await pollSituation.react('🤓');
        await pollSituation.react('💸');
        await pollSituation.react('🧐');

        let embedMeet = new EmbedBuilder()
            .setColor('#d0c61c')
            .setTitle('Tes types de sorties 😎')
            .setDescription(
                '☕ | Café\n' +
                '🍝 | Repas\n' +
                '🍺 | Bar\n' +
                '🥂 | Boîte de nuit\n' +
                '🏠 | Appart\n' +
                '🎸 | Concert\n' +
                '🎉 | Festival'
            )
        let pollMeet = await interaction.channel.send({embeds: [embedMeet], fetchReply: true});
        await pollMeet.react('☕');
        await pollMeet.react('🍝');
        await pollMeet.react('🍺');
        await pollMeet.react('🥂');
        await pollMeet.react('🏠');
        await pollMeet.react('🎸');
        await pollMeet.react('🎉');

        let embedDark = new EmbedBuilder()
            .setColor('#d0c61c')
            .setTitle(`Tu souhaites accéder au coin sombre ? 😮`)
            .setDescription(
                '🤫 | Oui mais chut !'
            )
        let pollDark = await interaction.channel.send({embeds: [embedDark], fetchReply: true});
        await pollDark.react('🤫');

    },
};