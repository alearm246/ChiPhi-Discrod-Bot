const fs = require("node:fs");
const path = require("node:path");

module.exports = (client) => {
    const pluginsPath = path.join(__dirname, "..", "plugins"); 
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
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${commandPath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}