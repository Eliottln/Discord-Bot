const { Guild, Birthday, Level, Warning} = require('../models');

module.exports = client => {
    // Guild
    client.updateGuild = async guild => {
        return Guild.findOneAndUpdate(
            {
                guild_id: guild.id,
            },
            {
                name: guild.name
            },
            {
                upsert: true,
                new: true,
            }
        );
    }


    // Birthday
    client.getBirthdays = async guild => {
        return Birthday.find({guild_id: guild.id});
    }

    client.getBirthday = async (guild, user) => {
        return Birthday.findOne({ guild_id: guild.id, user_id: user.id });
    }

    client.setBirthday = async (guild, user, day, month, year) => {
        return Birthday.findOneAndUpdate(
            {
                guild_id: guild.id,
                user_id: user.id,
            },
            {
                username: user.username,
                day: day,
                month: month,
                year: year,
            },
            {
                upsert: true,
                new: true,
            }
        );
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