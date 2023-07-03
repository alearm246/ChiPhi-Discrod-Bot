const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const crestManager = require("../structures/CrestManager.js");
const knex = require("../../../db/db.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
		.setDescription("view the leaderboard of crests"),
    async execute(interaction) {
        const usersGoldenCrestRanked = await knex("users").select().orderBy("golden_crest", "desc");
        const usersSilverCrestRanked = await knex("users").select().orderBy("silver_crest", "desc");
        const { silverCrestRanks, goldenCrestRanks } = crestManager.getLeaderBoard(usersSilverCrestRanked, usersGoldenCrestRanked);
        const crestsEmbed = new EmbedBuilder()
                        .setTitle("Leaderboard")
                        .setDescription("A leaderboard of crests")
                        .addFields(
                            { name: "Golden Crests 😏", value: goldenCrestRanks, inline: true},
                            { name: "\u200B", value: "\u200B", inline: true },
                            { name: "Silver Crests 😎", value: silverCrestRanks, inline: true}
                        )
                        .setColor("#E71D14");
        await interaction.reply({ embeds: [crestsEmbed] });
    }
}