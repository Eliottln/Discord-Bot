const schedule = require("node-schedule");
const {EmbedBuilder} = require("discord.js");
const {birthdayChannelId} = require("../config.json")

module.exports = {
    scheduleBday(day, month, year, username, client) {

        let currentDate = new Date();

        //Date constructor is in the format: year, month, day
        //Month is from 0-11, where 0 is January and 11 is December (so we subtract 1)
        let birthDate = new Date(currentDate.getFullYear(), Number(month) - 1, day);

        return schedule.scheduleJob(birthDate, () => {
            let newDate = new Date();
            let age = newDate.getFullYear() - year;

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`Aujourd'hui c'est l'anniversaire de ${username} !`)
                .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                .setDescription('Ça fait ' + age + ' ans que tu existes 🥳')
                .addFields([{name: 'Né le:', value: day+'/'+month+'/'+year}]);

            const channel = client.channels.cache.get(birthdayChannelId);
            if (!channel) return console.warn("birthday: Could not find channel");
            channel.send({ embeds: [embed] });
        });

    }
}