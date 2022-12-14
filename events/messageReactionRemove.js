const {Events} = require("discord.js");
const {rolesChannelId} = require("../config.json");

module.exports = {
    name: Events.MessageReactionRemove,
    once: false,
    async execute(messageReaction, user) {
        const message = messageReaction.message;
        const emojiName = messageReaction.emoji.name;
        const member = message.guild.members.cache.get(user.id);

        if (member.user.bot) return;

        if (messageReaction.partial) {
            try {
                await messageReaction.fetch();
            } catch (e) {
                console.log('Impossible de rΓ©puperer les messages.')
            }
        }

        if (message.channelId === rolesChannelId) {
            switch (emojiName) {
                // age πΆ π§ π§ π§ π
                case 'πΆ':
                    member.roles.remove('1012466926183796766');
                    break;
                case 'π§':
                    member.roles.remove('1012467026062741654');
                    break;
                case 'π§':
                    member.roles.remove('1012467224470094035');
                    break;
                case 'π§':
                    member.roles.remove('1012467268099248219');
                    break;
                case 'π΄':
                    member.roles.remove('1012467407605997598');
                    break;
                case 'π':
                    member.roles.remove('1012467448995389461');
                    break;
                // sorties π  πΊ π₯ πΈ β π π
                case 'β':
                    member.roles.remove('1012466558192332850');
                    break;
                case 'π':
                    member.roles.remove('1012466607697711134');
                    break;
                case 'πΊ':
                    member.roles.remove('1012466388172025998');
                    break;
                case 'π₯':
                    member.roles.remove('1012466478722859079');
                    break;
                case 'π ':
                    member.roles.remove('1012465578444849323');
                    break;
                case 'πΈ':
                    member.roles.remove('1012466515720814703');
                    break;
                case 'π':
                    member.roles.remove('1012466580292128818');
                    break;
                // situation pro π€ πΈ π§
                case 'π€':
                    member.roles.remove('1012467655724245086');
                    break;
                case 'πΈ':
                    member.roles.remove('1012467687051509940');
                    break;
                case 'π§':
                    member.roles.remove('1012467696513843200');
                    break;
                // genre πΉ πΊ π» π³οΈβπ
                case 'πΉ':
                    member.roles.remove('1012494075833892914');
                    break;
                case 'πΊ':
                    member.roles.remove('1012493920090996816');
                    break;
                case 'π»':
                    member.roles.remove('1012494165717815337');
                    break;
                case 'π³οΈβπ':
                    member.roles.remove('1012494129739079792');
                    break;
                // dijon π πΆ π
                case 'π':
                    member.roles.remove('1012477964455256094');
                    break;
                case 'πΆ':
                    member.roles.remove('1012478009971855361');
                    break;
                case 'π':
                    member.roles.remove('1012478033862594702');
                    break;
                // role sombre π€«
                case 'π€«':
                    member.roles.remove('962625719601627136');
                    break;
            }
        }
    }
}