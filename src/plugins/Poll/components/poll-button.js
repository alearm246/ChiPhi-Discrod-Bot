
const votedMembers = new Set();
module.exports = {
    data: {
        name: "poll"
    },
    async execute(interaction) {
        try {
            const split = interaction.customId.split("-");
            console.log(split);
            if (split[0] !== "poll") return;
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


            if (split[1] === "yes") {
                const newLeftCount = parseInt(leftButtonField.value) + 1;
                leftButtonField.value = newLeftCount;
                await interaction.reply({ content: "Your vote has been counted", ephemeral: true});
                await interaction.message.edit({embeds: [pollEmbed]});
            } else if (split[1] === "no") {
                const newRightCount = parseInt(rightButtonField.value) + 1;
                rightButtonField.value = newRightCount;
                await interaction.reply({ content: "Your vote has been counted", ephemeral: true});
                await interaction.message.edit({embeds: [pollEmbed]});
            }
        } catch(err) {
            console.error(err);
        }
    }
}