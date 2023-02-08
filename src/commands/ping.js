const { SlashCommandBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        await interaction.deferReply();
        await wait(5000);
        //await interaction.reply({ content: "Ping!", ephemeral: true });
        await interaction.followUp("Ping again without it being secret!");
        await wait(2000);
        await interaction.editReply("lolololol");
    }
}