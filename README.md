# DISCORD BOT
## Decription
This is a bot for a private discord server. It supports slash commands and just some of them are global and work on several discord servers at the same time, the others work for a single server.
So you can use it for your server with your friends.

---
## Discord.js : v14.6.0
Requires **Node 16.9** or higher to use, so make sure you're up to date. To check your Node version, use `node -v` in your terminal or command prompt, and if it's not high enough, update it!

---
## Setup the project
You have to add a file named `config.json` to the root of the project, and add the following lines in the file with your token, channel ids and your database link (MongoDB Cloud).
```json
{
  "databaseUri": "mongodb+srv://",
  "token": "",
  "clientId": "",
  "guildId": "",
  "generalChannelId": "",
  "arrivalChannelId": "",
  "rolesChannelId": "",
  "levelsChannelId": "",
  "birthdayChannelId": ""
}
```

Then run `npm i` in a terminal to install all dependencies that are in the `package.json` file.
```json
"dependencies": {
"@discordjs/builders": "^1.3.0",
"@discordjs/rest": "^1.3.0",
"discord-api-types": "^0.37.14",
"discord.js": "^14.6.0",
"mongoose": "^6.6.5",
"node-schedule": "^2.1.0"
}
```

---
## Start the program
Before running the program, you must run `node deploy-commands.js` in your terminal to register or update the slash commands for your bot application.
Now at the root of the projet, run `node .` or `node index.js`
If there is no error, you can now use the bot!
Otherwise, try installing all the dependencies manually with `npm install thepackage`.

---
## Documentation
- [Discord.js](https://discord.js.org)
- [Discord.js Guide](https://discordjs.guide)
- [Mongoose documentation](https://mongoosejs.com)