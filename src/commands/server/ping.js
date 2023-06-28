const { SlashCommandBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        try {
            await interaction.reply(`Bot Ping: ${interaction.client.ws.ping}ms`)
        } catch(err) {
            console.error(err);
        }
    }
}