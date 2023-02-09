const fs = require('node:fs');
const path = require('node:path');
require("dotenv").config();
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent] 
});

client.commands = new Collection();

//commands
const commandsPath = path.join(__dirname + "/commands");
const commandsFile = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandsFile) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

//events
const eventsPath = path.join(__dirname, '/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
        console.log("Event: ", event);
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.TOKEN);