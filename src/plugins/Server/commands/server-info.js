const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Provides information about the server"),
    async execute(interaction) {
        await interaction.reply(`This is the sacred server of ${interaction.guild.name} and has ${interaction.guild.memberCount} members`);
    }
}