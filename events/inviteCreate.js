const {Events} = require('discord.js');

module.exports = {
    name: Events.InviteCreate,
    once: false,
    async execute(invite) {
        invite.client.invites[invite.code] = invite.uses;
        console.log("Invite created")
    }
}