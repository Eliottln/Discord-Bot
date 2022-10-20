const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}`);
                console.error(error);
            }

        } else if (interaction.isButton()) {

            if (interaction.customId === "accept-button") {
                try {
                    await interaction.member.roles.add('962621385216249877');
                    await interaction.reply({content: 'Tu es maintenant membre du serveur !', ephemeral: true});
                } catch (error) {
                    console.error(`Error executing ${interaction.customId}`);
                    console.error(error)
                }
            }

        } else console.error(`No command or button matching ${interaction} was found.`);
    },
};
