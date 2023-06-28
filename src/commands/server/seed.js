const { SlashCommandBuilder } = require("discord.js");
const knex = require("../../db/db.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("seed")
        .setDescription("seeds the users table with all the members of the discord server"),
    async execute(interaction) {
        try {
            if (interaction.user.id != process.env.DEVELOPER) {
                await interaction.reply("You do not have the authorization to run this command");
            }

            const usersToInsert = [];
            const members = await interaction.guild.members.fetch();

            for (const [key, val] of members) {
                const { user } = val;
                if (!user.bot) {
                    const userExists = await knex("users").where("id", user.id).select("id").first();
                    if (!userExists) {
                        usersToInsert.push({
                            id: user.id,
                            username: user.username,
                            silver_crest: 0,
                            golden_crest: 0
                        })
                    }  
                }
            }

            if (usersToInsert.length == 0) {
                await interaction.reply({ content: "There are no new users to add to the database", ephemeral: true});
            } else {
                await interaction.deferReply({ content: "seeding the users table...", ephemeral: true });
                await knex("users").insert(usersToInsert);
                await interaction.editReply({ content: "successfully seeded the database!", ephemeral: true});
            }
        } catch(err) {
            console.error(err);
        }
    }
}