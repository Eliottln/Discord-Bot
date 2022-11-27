const {EmbedBuilder, SlashCommandBuilder, PermissionsBitField} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Récupère la liste des commandes du bot avec leur description."),
    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle('Liste des commandes du bot')
            .setColor('#8941ff')
            .addFields(
                interaction.client.commands.map((cmd) => {
                    const permissions = new PermissionsBitField(cmd.data.default_member_permissions).toArray()
                    return {
                        name: `\`${cmd.data.name || "Pas de description"}\``,
                        value: `${cmd.data.description || "Pas de description."}\nPermissions requises: ${permissions.map(perm => `*${perm}*`).join(', ') || "Pas de permission"}`,
                    };
                })
            );

        await interaction.reply({embeds: [embed]});

    },
};