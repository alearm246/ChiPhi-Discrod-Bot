const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");

const HOUSE_REP = {
    mezes: "sidney-mezes",
    cronkite: "walter-cronkite",
    briscoe: "dolph-briscoe",
    winston: "george-winston"
}

const quotes = {
    [HOUSE_REP.mezes]: [
        "Education is not just about acquiring knowledge, but about shaping the future and shaping ourselves.",
        "Leadership is about creating opportunities and empowering others to achieve great things.",
        "Dedication and hard work are the keys to unlocking our full potential.",
        "The pursuit of knowledge is a lifelong journey that brings us closer to understanding the world and our place in it.",
        "Peace and understanding can only be achieved through collaboration, dialogue, and a commitment to making the world a better place."
    ],
    [HOUSE_REP.cronkite]: [
        "America's health care system is neither healthy, caring, nor a system",
        "I can't imagine a person becoming a success who doesn't give this game of life everything he's got.",
        "There is no such thing as little freedom. Either you are all free, or you are not free",
        "Journalism is what we need to make democracy work",
        "I learned early on that in the real world, the masks of tragedy and comedy adorn the proscenium of every life"
    ],
    [HOUSE_REP.briscoe]: [
        "anyone who wants to complain, make suggestions, or just talk to the governor will be welcome.",
        "As Texans, we are resilient, hardworking, and resourceful. Let us use these qualities to overcome any challenge that comes our way.",
        "Service to our fellow citizens should be at the forefront of all that we do as public servants. Let us work tirelessly to improve the lives of all Texans.",
        "Education is the foundation of a strong society. It is our duty to ensure that every Texan has access to quality education.",
        "Integrity is the cornerstone of good governance. Let us work together to restore trust in our state government."
    ],
    [HOUSE_REP.winston]: [
        "Success is not just about achieving our goals, it is about making a positive impact on the world and leaving a lasting legacy.",
        "The power of perseverance and determination can overcome any obstacle and bring us to great heights.",
        "Character is the cornerstone of a successful life. It is what sets us apart and defines who we are.",
        "Universities have a great responsibility to provide knowledge, opportunity and leadership to the next generation. We must work tirelessly to fulfill this duty.",
        "Education is the foundation upon which we build our future. It is the key to unlocking our potential and shaping the world around us."
    ]
}

function getRandomQuote(houseRep) {
    const repQuotes = quotes[houseRep];
    const randomQuote = repQuotes[Math.floor(Math.random() * (repQuotes.length - 1))];
    return randomQuote;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("get-quote")
        .setDescription("Gets a quote from one of the House representatives")
        .addStringOption(option => option
                .setName("house-representative-name")
				.setDescription("Choose one of the 5 names")
				.setRequired(true)
				.addChoices(
					{ name: HOUSE_REP.mezes, value: HOUSE_REP.mezes},
                    { name: HOUSE_REP.cronkite, value: HOUSE_REP.cronkite},
                    { name: HOUSE_REP.briscoe, value: HOUSE_REP.briscoe},
                    { name: HOUSE_REP.winston, value: HOUSE_REP.winston}
				)),
    async execute(interaction) {
        const houseRep = interaction.options.getString("house-representative-name");
        switch (houseRep) {
            case HOUSE_REP.mezes:
                //C:\Users\alear\personal_projects\assets\sidney-mezes.jpg
                const mezesAttachment = new AttachmentBuilder("./src/assets/sidney-mezes.jpg");
                const mezesEmbed = new EmbedBuilder()
                    .setTitle(HOUSE_REP.mezes)
                    .setAuthor({ name: HOUSE_REP.mezes, iconURL: "attachment://sidney-mezes.jpg" })
                    .setThumbnail("attachment://sidney-mezes.jpg")
                    .addFields( { name: "Mezes Quote", value: getRandomQuote(HOUSE_REP.mezes)})
                    .setImage("attachment://sidney-mezes.jpg")
                    .setColor("#E71D14")
                await interaction.reply({ embeds: [mezesEmbed], files: [mezesAttachment]});
                break;
            case HOUSE_REP.cronkite:
                const cronkiteAttachment = new AttachmentBuilder("./src/assets/walter-cronkite.jpg");
                const cronkiteEmbed = new EmbedBuilder()
                    .setTitle(HOUSE_REP.cronkite)
                    .setAuthor({ name: HOUSE_REP.cronkite, iconURL: "attachment://walter-cronkite.jpg" })
                    .setThumbnail("attachment://walter-cronkite.jpg")
                    .addFields( { name: "Cronkite Quote", value: getRandomQuote(HOUSE_REP.cronkite)})
                    .setImage("attachment://walter-cronkite.jpg")
                    .setColor("#E71D14")
                await interaction.reply({ embeds: [cronkiteEmbed], files: [cronkiteAttachment]});
                break;
            case HOUSE_REP.briscoe:
                const briscoeAttachment = new AttachmentBuilder("./src/assets/dolph-briscoe.jpg");
                const briscoeEmbed = new EmbedBuilder()
                    .setTitle(HOUSE_REP.briscoe)
                    .setAuthor({ name: HOUSE_REP.briscoe, iconURL: "attachment://dolph-briscoe.jpg" })
                    .setThumbnail("attachment://dolph-briscoe.jpg")
                    .addFields( { name: "Briscoe Quote", value: getRandomQuote(HOUSE_REP.briscoe)})
                    .setImage("attachment://dolph-briscoe.jpg")
                    .setColor("#E71D14")
                await interaction.reply({ embeds: [briscoeEmbed], files: [briscoeAttachment]});
                break;
            case HOUSE_REP.winston:
                const winstonAttachment = new AttachmentBuilder("./src/assets/george-winston.jpg");
                const winstonEmbed = new EmbedBuilder()
                    .setTitle(HOUSE_REP.winston)
                    .setAuthor({ name: HOUSE_REP.winston, iconURL: "attachment://george-winston.jpg" })
                    .setThumbnail("attachment://george-winston.jpg")
                    .addFields( { name: "Winston Quote", value: getRandomQuote(HOUSE_REP.winston)})
                    .setImage("attachment://george-winston.jpg")
                    .setColor("#E71D14")
                await interaction.reply({ embeds: [winstonEmbed], files: [winstonAttachment]});
                break;
        }
    }
}