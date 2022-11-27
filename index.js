const fs = require('node:fs');
const path = require('node:path');
const { Client, Partials, GatewayIntentBits, Collection} = require('discord.js');
const { token, databaseUri } = require('./config.json');
const mongoose = require("mongoose");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildScheduledEvents,
    ],
    partials: [
        Partials.Message, Partials.Channel, Partials.Reaction, Partials.User,
    ]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

require('./utils/Functions')(client);

process.on('exit', code => { console.error(`Le processus s'est arrêté avec le code: ${code}`)})
process.on('uncaughtException', (err, origin) => { console.error(`uncaughtException: ${err}`, `- Origin: ${origin}`)})
process.on('unhandledRejection', (reason, promise) => { console.error(`unhandledRejection: ${reason}\n`, promise)})
process.on('warning', (...args) => { console.warn(...args)})

mongoose.connect(databaseUri, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}).then(() => console.log('Client connecté à la BDD'))
    .catch(err => console.log(err));
client.login(token);
