const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const plugins = require("./plugins");
const creds = require("../env");
const { BOT_ID } = require('../env');
require("dotenv").config();

const commands = [];

for (const plugin of plugins) {
    const { commands: innerCommands } = plugin;
    for (const command of innerCommands) {
       commands.push(command.data.toJSON());
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(creds.BOT_ID, creds.GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();