const { Events } = require("discord.js");

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(client) {
        console.log(client);
		//return await client.reply("New user has joined!");
	},
};