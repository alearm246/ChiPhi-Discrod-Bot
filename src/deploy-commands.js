const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require("dotenv").config();

const commands = [];
const commandsPath = path.join(__dirname, "commands"); 
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
	const commandFolderPath = path.join(commandsPath, folder);
	const commandFiles = fs.readdirSync(commandFolderPath);
	for (const file of commandFiles) {
		const commandPath = path.join(commandFolderPath, file);
		const command = require(commandPath);
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
			Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();