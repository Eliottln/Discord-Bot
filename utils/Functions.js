const { Guild, Birthday, Level, Warning} = require('../models');

module.exports = client => {
    // Guild
    client.getGuild = async guild => {
        return Guild.findOne({guild_id: guild.id});
    };

    client.createGuild = async guild => {
        const createGuild = new Guild({
            guild_id: guild.id,
            name: guild.name,
        });
        createGuild.save().then(g => console.log(`Nouveau serveur (${g.id})`));
    }

    client.updateGuild = async (guild, settings) => {
        let guildData = await client.getGuild(guild);
        if (typeof guildData != 'object') guildData = {};
        for (const key in settings){
            if (guildData[key] !== settings[key]) guildData[key] = settings[key];
        }
        return guildData.updateOne(settings);
    }


    // Birthday
    client.getBirthdays = async guild => {
        return Birthday.find({guild_id: guild.id});
    }

    client.getBirthday = async (guild, user) => {
        return Birthday.findOne({ guild_id: guild.id, user_id: user.id });
    }

    client.setBirthday = async (guild, user, day, month, year) => {
        let query = client.getBirthday(guild, user);
        query.then(doc => {
            if (doc == null) {
                const createBDay = new Birthday({
                    user_id: user.id,
                    username: user.username,
                    day: day,
                    month: month,
                    year: year,
                    guild_id: guild.id,
                });
                return createBDay.save().then(() => console.log('Date de naissance enregistrée'));
            }
            else {
                return doc.updateOne({
                    day: day,
                    month: month,
                    year: year,
                });
            }
        })
    }


    // Level
    client.getLevel = async (guild, user) => {
        return Level.findOne({ guild_id: guild.id, user_id: user.id });
    }

    client.createLevel = async (guild, user) => {
        const createLevel = new Level({
            guild_id: guild.id,
            user_id: user.id,
        });
        return createLevel.save().then(() => console.log('Niveau d\'utilisateur créé'));
    }

    client.updateLevel = async (guild, user, settings) => {
        let levelData = await client.getLevel(guild, user);
        if (typeof levelData != 'object') levelData = {};
        for (const key in settings){
            if (levelData[key] !== settings[key]) levelData[key] = settings[key];
        }
        return levelData.updateOne(settings);
    }


    // Warning
    client.getWarning = async (guild, user) => {
        return Warning.findOne({ guild_id: guild.id, user_id: user.id });
    };

    client.addWarning = async (guild, user, settings) => {
        return Warning.findOneAndUpdate(
            {
                guild_id: guild.id,
                user_id: user.id,
            },
            {
                $push: {
                    warning_list: settings
                }
            },
            {
                upsert: true,
                new: true,
            }
        );
    }
}