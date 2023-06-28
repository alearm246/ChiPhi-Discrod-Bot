const fs = require('node:fs');
const path = require('node:path');
const eventHandler = require("./handlers/eventHandler.js");
require("dotenv").config();
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const commandHandler = require('./handlers/commandHandler.js');

// Create a new client instance
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
] 
});

client.commands = new Collection();
client.buttons = new Collection();

require("./deploy-commands");
eventHandler(client);
commandHandler(client);

client.login(process.env.TOKEN);