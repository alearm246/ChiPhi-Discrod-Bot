const fs = require("node:fs");
const path = require("node:path");

module.exports = (client) => {
    const commandsPath = path.join(__dirname, "..", "commands"); 
    const commandFolders = fs.readdirSync(commandsPath);

    for (const folder of commandFolders) {
        const commandFolderPath = path.join(commandsPath, folder);
        const commandFiles = fs.readdirSync(commandFolderPath);
        for (const file of commandFiles) {
            const commandPath = path.join(commandFolderPath, file);
            const command = require(commandPath);
            client.commands.set(command.data.name, command);
        }
    }
}