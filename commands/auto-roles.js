const {EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('auto-roles')
        .setDescription('Gรฉnรจre les embeds pour les auto-roles.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option
                .setName('type')
                .setDescription('Choisi l\'embed pour les rรดles que tu veux')
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
                    .setTitle('Ton รขge ๐')
                    .setDescription(
                        '๐ถ | -18\n' +
                        '๐ง | 18 - 20\n' +
                        '๐ง | 21-23\n' +
                        '๐ง | 24-26\n' +
                        '๐ด | 27-29\n' +
                        '๐ | 30+'
                    )
                let pollAge = await interaction.reply({embeds: [embedAge], fetchReply: true});
                try {
                    await pollAge.react('๐ถ');
                    await pollAge.react('๐ง');
                    await pollAge.react('๐ง');
                    await pollAge.react('๐ง');
                    await pollAge.react('๐ด');
                    await pollAge.react('๐');
                } catch (error) {
                    console.error('One of the emojis failed to react:', error);
                }
                break;

            case 'dijon':
                let embedDijon = new EmbedBuilder()
                    .setColor('#d0c61c')
                    .setTitle('Tu connais Dijon ? ๐ค')
                    .setDescription(
                        '๐ | Oui\n' +
                        '๐ถ | Un peu\n' +
                        '๐ | Non'
                    )
                let pollDijon = await interaction.reply({embeds: [embedDijon], fetchReply: true});
                try {
                    await pollDijon.react('๐');
                    await pollDijon.react('๐ถ');
                    await pollDijon.react('๐');
                } catch (error) {
                    console.error('One of the emojis failed to react:', error);
                }
                break;

            case 'gender':
                let embedGender = new EmbedBuilder()
                    .setColor('#d0c61c')
                    .setTitle('Ton genre โ')
                    .setDescription(
                        '๐น | Homme\n' +
                        '๐บ | Femme\n' +
                        '๐ป | Genderfluid\n' +
                        '๐ณ๏ธโ๐ | Non-binaire'
                    )
                let pollGender = await interaction.reply({embeds: [embedGender], fetchReply: true});
                try {
                    await pollGender.react('๐น');
                    await pollGender.react('๐บ');
                    await pollGender.react('๐ป');
                    await pollGender.react('๐ณ๏ธโ๐');
                } catch (error) {
                    console.error('One of the emojis failed to react:', error);
                }
                break;

            case 'work':
                let embedSituation = new EmbedBuilder()
                    .setColor('#d0c61c')
                    .setTitle('Ta situation professionnelle ๐')
                    .setDescription(
                        '๐ค | รtudiant(e)\n' +
                        '๐ธ | Vie active\n' +
                        '๐ง | En recherche'
                    )
                let pollSituation = await interaction.reply({embeds: [embedSituation], fetchReply: true});
                try {
                    await pollSituation.react('๐ค');
                    await pollSituation.react('๐ธ');
                    await pollSituation.react('๐ง');
                } catch (error) {
                    console.error('One of the emojis failed to react:', error);
                }
                break;

            case 'trip':
                let embedMeet = new EmbedBuilder()
                    .setColor('#d0c61c')
                    .setTitle('Tes types de sorties ๐')
                    .setDescription(
                        'โ | Cafรฉ\n' +
                        '๐ | Repas\n' +
                        '๐บ | Bar\n' +
                        '๐ฅ | Boรฎte de nuit\n' +
                        '๐? | Appart\n' +
                        '๐ธ | Concert\n' +
                        '๐ | Festival'
                    )
                let pollMeet = await interaction.reply({embeds: [embedMeet], fetchReply: true});
                try {
                    await pollMeet.react('โ');
                    await pollMeet.react('๐');
                    await pollMeet.react('๐บ');
                    await pollMeet.react('๐ฅ');
                    await pollMeet.react('๐?');
                    await pollMeet.react('๐ธ');
                    await pollMeet.react('๐');
                } catch (error) {
                    console.error('One of the emojis failed to react:', error);
                }
                break;

            case 'dark':
                let embedDark = new EmbedBuilder()
                    .setColor('#d0c61c')
                    .setTitle(`Tu souhaites accรฉder au coin sombre ? ๐ฎ`)
                    .setDescription(
                        '๐คซ | Oui mais chut !'
                    )
                let pollDark = await interaction.reply({embeds: [embedDark], fetchReply: true});
                try {
                    await pollDark.react('๐คซ');
                } catch (error) {
                    console.error('One of the emojis failed to react:', error);
                }
                break;
        }

    },
};