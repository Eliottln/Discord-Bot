const {Events} = require('discord.js');

module.exports = {
    name: Events.InviteDelete,
    once: false,
    async execute(invite) {
        delete invite.client.invites[invite.code];
        console.log("Invite deleted")
    }
}