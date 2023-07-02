const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require("dotenv").config();

const commands = [];
const pluginsPath = path.join(__dirname, "plugins"); 
const pluginsFolders = fs.readdirSync(pluginsPath);

for (const pluginsFolder of pluginsFolders) {
	const pluginFolderPath = path.join(pluginsPath, pluginsFolder);
	const pluginFolders = fs.readdirSync(pluginFolderPath);
	const commandsFolder = pluginFolders.find(folder => folder === "commands");
	const commandsFolderPath = path.join(pluginFolderPath, commandsFolder);
	const commandsFolders = fs.readdirSync(commandsFolderPath);
	for (const file of commandsFolders) {
		const commandPath = path.join(commandsFolderPath, file);
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