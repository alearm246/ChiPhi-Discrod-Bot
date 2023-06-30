const { Events } = require("discord.js");
require("dotenv").config();

module.exports = {
	name: Events.MessageReactionAdd,
	async execute(messageReaction, user) {
		console.log(`A message has been reacted to!`);
	},
};