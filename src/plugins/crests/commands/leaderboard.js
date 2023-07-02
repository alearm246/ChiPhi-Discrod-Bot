const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
		.setDescription("view the leaderboard of crests"),
    async execute(interaction) {
        console.log("leaderboard!");
    }
}