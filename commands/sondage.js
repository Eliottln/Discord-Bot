const {EmbedBuilder, SlashCommandBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sondage')
        .setDescription('Poste ton propre sondage.')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages + PermissionFlagsBits.UseApplicationCommands)
        .addSubcommand(subcommand =>
            subcommand
                .setName('simple')
                .setDescription('Sondage avec ta question')
                .addStringOption(option =>
                    option
                        .setName('question')
                        .setDescription('Ecris ta question')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('personnalise')
                .setDescription('Sondage avec ta question et jusqu\'à 4 réponses possibles')
                .addStringOption(option =>
                    option
                        .setName('question')
                        .setDescription('Ecris ta question')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('reponse1')
                        .setDescription('Première réponse possible')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('reponse2')
                        .setDescription('Deuxième réponse possible')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('reponse3')
                        .setDescription('Troisième réponse possible'))
                .addStringOption(option =>
                    option
                        .setName('reponse4')
                        .setDescription('Quatrième réponse possible'))),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        let embed, poll;

        if (interaction.options.getSubcommand() === 'simple') {

            embed = new EmbedBuilder()
                .setColor('#d0c61c')
                .setTitle(question)
                .setDescription('Utilisez les réactions pour répondre')
                .setTimestamp()
                .setFooter({text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()});

            poll = await interaction.reply({embeds: [embed], fetchReply: true});
            await poll.react('👍');
            await poll.react('👎');
            await poll.react('🤷');
        } else if (interaction.options.getSubcommand() === 'personnalise') {

            let response1 = interaction.options.getString('reponse1')
            let response2 = interaction.options.getString('reponse2')
            let response3 = interaction.options.getString('reponse3')
            let response4 = interaction.options.getString('reponse4')

            if (response3 == null && response4 != null) {
                response3 = response4;
                response4 = null;
            }

            embed = new EmbedBuilder()
                .setColor('#d0c61c')
                .setTitle(question)
                .setTimestamp()
                .setFooter({text: `Par ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()});

            if (response3 != null && response4 != null) {
                embed.setDescription(
                    `1️⃣ | ${response1}\n` +
                    `2️⃣ | ${response2}\n` +
                    `3️⃣ | ${response3}\n` +
                    `4️⃣ | ${response4}`
                )
            } else if (response3 != null && response4 == null) {
                embed.setDescription(
                    `1️⃣ | ${response1}\n` +
                    `2️⃣ | ${response2}\n` +
                    `3️⃣ | ${response3}`
                )
            } else if (response3 == null) {
                embed.setDescription(
                    `1️⃣ | ${response1}\n` +
                    `2️⃣ | ${response2}`
                )
            }

            poll = await interaction.reply({embeds: [embed], fetchReply: true});
            await poll.react('1️⃣');
            await poll.react('2️⃣');
            if (response3 != null && response4 != null) {
                await poll.react('3️⃣');
                await poll.react('4️⃣');
            } else if (response3 != null && response4 == null) {
                await poll.react('3️⃣');
            }

        }
    },
};