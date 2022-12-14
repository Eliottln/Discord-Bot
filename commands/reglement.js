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
    .setTitle('--- πππππππππ ---')
    .setDescription('A survoler si vous le souhaitez mais Γ  respecter obligatoirement !')
    .addFields([
        {
            name: 'γπππππππππγ',
            value: 'Les insultes, le racisme, l\'antisΓ©mitisme, le sexisme, homophobie sont tolΓ©rΓ©s dans la limite du raisonnable. En cas d\'abus, des mesures peuvent Γͺtre prises.',
        },
        {
            name: 'γπππππππππππγ',
            value: 'Toutes formes d\'incitation Γ  la haine que cela soit : suicide, piratage, violence, haine ect.. sont πππΏπΆπ°ππ²πΊπ²π»π interdites.',
        },
        {
            name: 'γπππ ππππππγ',
            value: 'Les disputes personnelles se rΓ¨glent en privΓ©.\n' +
                'Le partage non consenti d\'informations personnelles d\'une autre personne pourront Γͺtre punies.'
        },
        {
            name: 'γππ πππ ππ πππ πππππππ πππ ππππππγ',
            value: '1 avertissement\n' +
                '3 avertissements = 1 ban temporaire\n' +
                '2 ban = ban dΓ©finitif\n' +
                '\n' +
                'Ce serveur se base sur une relation de confiance. Vous Γͺtes une personne respectueuse et vous savez faire preuve de savoir-vivre; sinon des sanctions auront lieu sans discussion.\n' +
                '\n' +
                'Cliquez sur le bouton pour accepter le rΓ¨glement.'
        }]);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reglement')
        .setDescription('Affiche le rΓ¨glement du serveur.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        await interaction.reply({embeds: [embed], components: [button]})
    },
}