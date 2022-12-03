const {EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('auto-role')
        .setDescription('Génère les embeds pour les auto-roles.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option
                .setName('type')
                .setDescription('Choisi l\'embed pour les rôles que tu veux')
                .setRequired(true)
                .addChoices(
                    {name: 'Age', value: 'age'},
                    {name: 'Connaissance de Dijon', value: 'dijon'},
                    {name: 'Genre', value: 'gender'},
                    {name: 'Situation professionnelle', value: 'work'},
                    {name: 'Types de sorties', value: 'trip'},
                    {name: 'Coin Sombre', value: 'dark'},
                )),
    async execute(interaction) {

        const role = interaction.options.getString('type')

        switch (role) {
            case 'age':
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
                let pollAge = await interaction.reply({embeds: [embedAge], fetchReply: true});
                try {
                    await pollAge.react('👶');
                    await pollAge.react('🧒');
                    await pollAge.react('🧑');
                    await pollAge.react('🧓');
                    await pollAge.react('👴');
                    await pollAge.react('💀');
                } catch (error) {
                    console.error('One of the emojis failed to react:', error);
                }
                break;

            case 'dijon':
                let embedDijon = new EmbedBuilder()
                    .setColor('#d0c61c')
                    .setTitle('Tu connais Dijon ? 🤔')
                    .setDescription(
                        '😉 | Oui\n' +
                        '😶 | Un peu\n' +
                        '🙁 | Non'
                    )
                let pollDijon = await interaction.reply({embeds: [embedDijon], fetchReply: true});
                try {
                    await pollDijon.react('😉');
                    await pollDijon.react('😶');
                    await pollDijon.react('🙁');
                } catch (error) {
                    console.error('One of the emojis failed to react:', error);
                }
                break;

            case 'gender':
                let embedGender = new EmbedBuilder()
                    .setColor('#d0c61c')
                    .setTitle('Ton genre ❓')
                    .setDescription(
                        '🚹 | Homme\n' +
                        '🚺 | Femme\n' +
                        '🚻 | Genderfluid\n' +
                        '🏳️‍🌈 | Non-binaire'
                    )
                let pollGender = await interaction.reply({embeds: [embedGender], fetchReply: true});
                try {
                    await pollGender.react('🚹');
                    await pollGender.react('🚺');
                    await pollGender.react('🚻');
                    await pollGender.react('🏳️‍🌈');
                } catch (error) {
                    console.error('One of the emojis failed to react:', error);
                }
                break;

            case 'work':
                let embedSituation = new EmbedBuilder()
                    .setColor('#d0c61c')
                    .setTitle('Ta situation professionnelle 🙃')
                    .setDescription(
                        '🤓 | Étudiant(e)\n' +
                        '💸 | Vie active\n' +
                        '🧐 | En recherche'
                    )
                let pollSituation = await interaction.reply({embeds: [embedSituation], fetchReply: true});
                try {
                    await pollSituation.react('🤓');
                    await pollSituation.react('💸');
                    await pollSituation.react('🧐');
                } catch (error) {
                    console.error('One of the emojis failed to react:', error);
                }
                break;

            case 'trip':
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
                let pollMeet = await interaction.reply({embeds: [embedMeet], fetchReply: true});
                try {
                    await pollMeet.react('☕');
                    await pollMeet.react('🍝');
                    await pollMeet.react('🍺');
                    await pollMeet.react('🥂');
                    await pollMeet.react('🏠');
                    await pollMeet.react('🎸');
                    await pollMeet.react('🎉');
                } catch (error) {
                    console.error('One of the emojis failed to react:', error);
                }
                break;

            case 'dark':
                let embedDark = new EmbedBuilder()
                    .setColor('#d0c61c')
                    .setTitle(`Tu souhaites accéder au coin sombre ? 😮`)
                    .setDescription(
                        '🤫 | Oui mais chut !'
                    )
                let pollDark = await interaction.reply({embeds: [embedDark], fetchReply: true});
                try {
                    await pollDark.react('🤫');
                } catch (error) {
                    console.error('One of the emojis failed to react:', error);
                }
                break;
        }

    },
};