const { Events } = require("discord.js");

const votedMembers = new Set();
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
                const split = interaction.customId.split("-");
                console.log(split);
                if (split[0] !== "Poll") return;
                if (votedMembers.has(`${interaction.user.id}-${interaction.message.id}`)) {
                    return await interaction.reply({ content: "You have already voted", ephemeral: true });
                }
                votedMembers.add(`${interaction.user.id}-${interaction.message.id}`);
                console.log("set: ", votedMembers);
                const pollEmbed = interaction.message.embeds[0];
                if (!pollEmbed) {
                    return await interaction.reply({
                        content: "Contact developer. Unable to find poll embed",
                        ephemeral: true
                    })
                }
                const leftButtonField = pollEmbed.fields[0];
                const rightButtonField = pollEmbed.fields[1];
        

                if (split[1] === "Yes") {
                    const newLeftCount = parseInt(leftButtonField.value) + 1;
                    leftButtonField.value = newLeftCount;
                    interaction.reply({ content: "Your vote has been counted", ephemeral: true});
                    interaction.message.edit({embeds: [pollEmbed]});
                } else if (split[1] === "No") {
                    const newRightCount = parseInt(rightButtonField.value) + 1;
                    rightButtonField.value = newRightCount;
                    interaction.reply({ content: "Your vote has been counted", ephemeral: true});
                    interaction.message.edit({embeds: [pollEmbed]});
                }
            }
        } catch(err) {
            console.error(err);
        }
	},
}