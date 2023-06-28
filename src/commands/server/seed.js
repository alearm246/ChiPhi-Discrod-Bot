const { SlashCommandBuilder } = require("discord.js");
const knex = require("../../db/db.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("seed")
        .setDescription("seeds the users table with all the members of the discord server"),
    async execute(interaction) {
        try {
            const usersToInsert = [];
            const members = await interaction.guild.members.fetch();
            for (const [key, val] of members) {
                if (!val.user.bot) {
                    usersToInsert.push({
                        id: val.user.id,
                        username: val.user.username,
                        silver_crest: 0,
                        golden_crest: 0
                    })
                }
            }
            await interaction.deferReply({ content: "seeding the users table...", ephemeral: true });
            await knex('users').insert(usersToInsert);
            await interaction.editReply({ content: "successfully seeded the database!", ephemeral: true});
        } catch(err) {
            console.error(err);
        }
    }
}