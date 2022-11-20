const {REST, Routes} = require('discord.js');
const {clientId, guildId, token} = require('./config.json');
const fs = require('node:fs');

const commands = [];
const globalCommands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    switch (file) {
        case 'clear.js':
        case 'info-membre.js':
        case 'info-serveur.js':
        case 'ping.js':
        case 'sondage.js':
            const globalCommand = require(`./commands/${file}`);
            globalCommands.push(globalCommand.data.toJSON());
            break;
        default:
            const command = require(`./commands/${file}`);
            commands.push(command.data.toJSON());
            break;
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST({version: '10'}).setToken(token);

// deploy commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) guild commands.`);
        console.log(`Started refreshing ${globalCommands.length} application (/) global commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            {body: commands},
        );
        const globalData = await rest.put(
            Routes.applicationCommands(clientId),
            {body: globalCommands},
        );

        console.log(`Successfully reloaded ${data.length} application (/) guild commands.`);
        console.log(`Successfully reloaded ${globalData.length} application (/) global commands.`);
    } catch (error) {
        console.error(error);
    }
})();
