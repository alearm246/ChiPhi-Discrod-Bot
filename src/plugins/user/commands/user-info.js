const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Provides information about the user"),
    async execute(interaction) {
        try {
            await interaction.reply(`This command was ran by our brother ${interaction.user.username}` + 
                ` who joined the server on ${interaction.member.joinedAt}`);
        } catch(err) {
            console.error(err);
        }
    }
};