const fs = require('node:fs');
const path = require('node:path');
const plugins = require("./plugins");
require("dotenv").config();
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent] 
});

client.commands = new Collection();
client.buttons = new Collection();

//commands
for (const plugin of plugins) {
    const { commands } = plugin;
    for (const command of commands) {
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command named ${command.data.name} is missing a required "data" or "execute" property.`);
        }  
    }
}

//components
for (const plugin of plugins) {
    const { components } = plugin;
    for (const component in components) {
        const widgets = components[component];
        if (widgets.length !== 0) {
            for (const widget of widgets) {
                if (widget.data) {
                    client[component].set(widget.data.name, widget);
                }
            }
        }
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
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.TOKEN);