const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("creed")
		.setDescription("Dislays the creed"),
    async execute(interaction) {
        const creed = "I believe in the Chi Phi Fraternity. From its tripple origin, Chi Phi sets forth and " +
        "maintains values that others in society have dared to compromise.\n\nTruth, honor, and personal integrity are\n" +
        "the foundations upon wich Chi Phi is built. A man's word is his bond. Chivalrous behavior crosses the ages " +
        "to touch the heart of Chi Phi.\n\nI believe in the friendship of Chi Phi. Wheter on the road or in the chapter house, " +
        "the hand of brotherhood is always extended. The strength obtained from the union of congenial minds is the backbone of " +
        "the Fraternity. Our Founders sought for nothing less.\n\nFinally, I believe in the future of the Chi Phi fraternity " +
        "because I believe in myself. When I put forth my best effort and combine that with the strength of my Brothers, we can achieve " +
        "the victory of continual existence.\n\nAs long as the Almighty permits, I will strive to better myself through the teachings of my " +
        "Fraternity. Being a more aware citizen, a more able person, and a stronger Chi Phi shall be my reward"
        const attachment = new AttachmentBuilder("./src/assets/chiphi.png");
        const creedEmbed = new EmbedBuilder()
                    .setTitle("Chi Phi Creed")
                    .setAuthor({ name: "Chi Phi", iconURL: "attachment://chiphi.png" })
                    .setThumbnail("attachment://chiphi.png")
                    .addFields( { name: "Creed", value: creed})
                    .setImage("attachment://chiphi.png")
                    .setColor("#E71D14")
        await interaction.reply({ embeds: [creedEmbed], files: [attachment]});
    }
}