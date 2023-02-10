const { Events } = require("discord.js");
require("dotenv").config();

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag} in the ${process.env.ENVIRONMENT}`);
	},
};