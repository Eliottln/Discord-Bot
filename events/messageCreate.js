const { EmbedBuilder } = require("discord.js");
const {rolesChannelId} = require("../config.json");

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        if (message.author.bot) return

        const client = message.client
        const messageContent = message.content.toLowerCase();

        // Level
        if (message.guildId === rolesChannelId) {
            const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
            await client.getLevel(message.guild, message.author).then(async userLevel => {
                let levelData = {}
                if (userLevel == null) {
                    await client.createLevel(message.guild, message.author)
                    levelData.level = 1
                    levelData.exp = 0
                }
                else {
                    levelData = userLevel
                }
                let exp = levelData.exp + randomAmountOfXp;
                let level = levelData.level;
                const nxtLvl = 80 * (Math.pow(2, level) - 1);
                if (exp > nxtLvl) {
                    level += 1;
                    let nxtLvl = 80 * (Math.pow(2, level) - 1);
                    const embed = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle(`Wow tu as atteint le niveau suivant !`)
                        .setDescription(`${message.author} est maintenant au niveau ${level} !`)
                        .addFields([{name: 'Prochain niveau dans:', value: `${(nxtLvl - exp)} exp`}])
                        .setTimestamp();

                    const channel = client.channels.cache.get('1012480937877061653');
                    if (channel) channel.send({content: `${message.author}`, embeds: [embed]});
                    else console.warn("level-up: Could not find channel");
                }
                await client.updateLevel(message.guild, message.author, {
                    exp: exp,
                    level: level,
                    $inc: {
                        number_of_messages: 1,
                    },
                });
            });
        }


        if (messageContent.includes('salut') || messageContent.includes('coucou') || messageContent.includes('bonjour')
            || messageContent.includes('hello')) {
            await message.react('👋');
        }


        // some responses
        const regex1 = new RegExp('((.?\\n?)\\s+|^\\s*)(q+u+o+i+|k+w+a+)\\s*\\?*$');
        if (regex1.test(messageContent) && Math.floor(Math.random() * 4) === 1) {
            return message.reply('feur');
        }
        else if (messageContent.includes('shrek')) {
            return message.reply('\`\`\`⢀⡴⠑⡄⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
                '⠸⡇⠀⠿⡀⠀⠀⠀⣀⡴⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
                '⠀⠀⠀⠀⠑⢄⣠⠾⠁⣀⣄⡈⠙⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀\n' +
                '⠀⠀⠀⠀⢀⡀⠁⠀⠀⠈⠙⠛⠂⠈⣿⣿⣿⣿⣿⠿⡿⢿⣆⠀⠀⠀⠀⠀⠀⠀\n' +
                '⠀⠀⠀⢀⡾⣁⣀⠀⠴⠂⠙⣗⡀⠀⢻⣿⣿⠭⢤⣴⣦⣤⣹⠀⠀⠀⢀⢴⣶⣆\n' +
                '⠀⠀⢀⣾⣿⣿⣿⣷⣮⣽⣾⣿⣥⣴⣿⣿⡿⢂⠔⢚⡿⢿⣿⣦⣴⣾⠁⠸⣼⡿\n' +
                '⠀⢀⡞⠁⠙⠻⠿⠟⠉⠀⠛⢹⣿⣿⣿⣿⣿⣌⢤⣼⣿⣾⣿⡟⠉⠀⠀⠀⠀⠀\n' +
                '⠀⣾⣷⣶⠇⠀⠀⣤⣄⣀⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀\n' +
                '⠀⠉⠈⠉⠀⠀⢦⡈⢻⣿⣿⣿⣶⣶⣶⣶⣤⣽⡹⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀\n' +
                '⠀⠀⠀⠀⠀⠀⠀⠉⠲⣽⡻⢿⣿⣿⣿⣿⣿⣿⣷⣜⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀\n' +
                '⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣶⣮⣭⣽⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀\n' +
                '⠀⠀⠀⠀⠀⠀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀\n' +
                '⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀\n' +
                '⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
                '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⠿⠿⠿⠛⠉\`\`\`');
        }
        else if (messageContent === "pop") {
            return message.reply('||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop||')
        }

    }
}