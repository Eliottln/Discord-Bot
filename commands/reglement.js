const {ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, SlashCommandBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");

const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('accept-button')
            .setLabel('Accepter')
            .setStyle(ButtonStyle.Success),
    );

const embed = new EmbedBuilder()
    .setColor('#24b345')
    .setTitle('--- 𝐑𝐄𝐆𝐋𝐄𝐌𝐄𝐍𝐓 ---')
    .setDescription('A survoler si vous le souhaitez mais à respecter obligatoirement !')
    .addFields([
        {
            name: '》𝐕𝐔𝐋𝐆𝐀𝐑𝐈𝐓𝐄《',
            value: 'Les insultes, le racisme, l\'antisémitisme, le sexisme, homophobie sont tolérés dans la limite du raisonnable. En cas d\'abus, des mesures peuvent être prises.',
        },
        {
            name: '》𝐇𝐀𝐑𝐂𝐄𝐋𝐄𝐌𝐄𝐍𝐓《',
            value: 'Toutes formes d\'incitation à la haine que cela soit : suicide, piratage, violence, haine ect.. sont 𝘀𝘁𝗿𝗶𝗰𝘁𝗲𝗺𝗲𝗻𝘁 interdites.',
        },
        {
            name: '》𝐕𝐈𝐄 𝐏𝐑𝐈𝐕𝐄𝐄《',
            value: 'Les disputes personnelles se règlent en privé.\n' +
                'Le partage non consenti d\'informations personnelles d\'une autre personne pourront être punies.'
        },
        {
            name: '》𝐄𝐍 𝐂𝐀𝐒 𝐃𝐄 𝐍𝐎𝐍 𝐑𝐄𝐒𝐏𝐄𝐂𝐓 𝐃𝐄𝐒 𝐑𝐄𝐆𝐋𝐄𝐒《',
            value: '1 avertissement\n' +
                '3 avertissements = 1 ban temporaire\n' +
                '2 ban = ban définitif\n' +
                '\n' +
                'Ce serveur se base sur une relation de confiance. Vous êtes une personne respectueuse et vous savez faire preuve de savoir-vivre; sinon des sanctions auront lieu sans discussion.\n' +
                '\n' +
                'Cliquez sur le bouton pour accepter le règlement.'
        }]);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reglement')
        .setDescription('Affiche le règlement du serveur.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        await interaction.reply({embeds: [embed], components: [button]})
    },
}