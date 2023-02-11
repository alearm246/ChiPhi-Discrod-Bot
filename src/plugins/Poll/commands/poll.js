const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Create a poll")
        .addStringOption(option => option
            .setName("question")
            .setDescription("Provide the question of the poll")
            .setRequired(true))
        .addStringOption(option => option
            .setName("left-button")
            .setDescription("Text for the left button")
            .setRequired(true))
        .addStringOption(option => option
            .setName("right-button")
            .setDescription("Text for the right button")
            .setRequired(true)),
    async execute(interaction) {
        try {
            const pollQuestion = interaction.options.getString("question");
            const leftButtonText = interaction.options.getString("left-button");
            const rightButtonText = interaction.options.getString("right-button");
            const pollEmbed = new EmbedBuilder()
                .setDescription("**Question:**\n" + pollQuestion)
                .addFields([
                    { name: `${leftButtonText}'s`, value: "0", inline: true },
                    { name: `${rightButtonText}'s`, value: "0", inline: true }
                ])
                .setColor("#E71D14")
            const replyObject = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });
            const pollButtons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel(leftButtonText)
                        .setCustomId(`poll-left-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setLabel(rightButtonText)
                        .setCustomId(`poll-right-${replyObject.id}`)
                        .setStyle(ButtonStyle.Danger)    
                );
            await interaction.editReply({ components: [pollButtons] });
        } catch(err) {
            console.error(err);
        }  
    }
}