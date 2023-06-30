const { Events } = require("discord.js");
const knex = require("../db/db.js");

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		const CHANNEL_ID = "1072717902089814048";
		const channel = await member.guild.channels.fetch(CHANNEL_ID);
		const { user } = member;
		const userExists = await knex("users").where("id", user.id).select("id").first();

		if (userExists) {
			channel.send(`Welcome back ${user.username}!`);
		} else {
			await knex("users").insert({
				id: user.id,
                username: user.username,
                silver_crest: 0,
                golden_crest: 0
			});
			channel.send(`Welcome ${user.username} to the Chi Phi discord server!`);
		}
	},
};