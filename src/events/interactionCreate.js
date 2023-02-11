const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
	async execute(interaction) {
        try {
            if (interaction.isChatInputCommand()) {
                const command = interaction.client.commands.get(interaction.commandName);
                if (!command) {
                    console.error(`No command matching ${interaction.commandName} was found.`);
                    return;
                }
                await command.execute(interaction);
            } else if (interaction.isButton()) {
                const splitId = interaction.customId.split("-");
                const button = interaction.client.buttons.get(splitId[0]);
                if (!button) {
                    return console.error("could not find button");
                }
                await button.execute(interaction);
            }
        } catch(err) {
            console.error(err);
        }
	},
}