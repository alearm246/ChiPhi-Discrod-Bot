const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const knex = require("../../../db/db.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("crests")
		.setDescription("show your crests"),
    async execute(interaction) {
        const user = await knex("users").where("id", interaction.user.id).select().first();
        const crestsEmbed = new EmbedBuilder()
                        .setTitle("crests")
                        .setDescription("A display of your crests")
                        .addFields(
                            { name: "Golden Crests 😏", value: user.golden_crest.toString()},
                            { name: "Silver Crests 😎", value: user.silver_crest.toString()}
                        )
                        .setColor("#E71D14");
        await interaction.reply({ embeds: [crestsEmbed] });
    }
}