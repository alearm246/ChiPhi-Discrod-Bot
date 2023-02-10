const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rock-paper-scissors")
		.setDescription("let's the user play a round of rock paper scissors")
		.addStringOption(option =>
			option.setName("rock-paper-scissors")
				.setDescription("choose either rock, paper, or scissors")
				.setRequired(true)
				.addChoices(
					{ name: "rock", value: "rock"},
                    { name: "paper", value: "paper"},
                    { name: "scissors", value: "scissors"}
				)),
    async execute(interaction) {
        try {
            const computerChoices = ["rock", "paper", "scissor"];
            const computerChoice = computerChoices[Math.floor(Math.random() * (computerChoices.length - 1))];
            const userChoice = interaction.options.getString("rock-paper-scissors");
            if (computerChoice === "rock" && userChoice === "paper") {
                await interaction.reply("Nice job! You won!");
            } else if (computerChoice === "rock" && userChoice === "scissors") {
                await interaction.reply("Dam...can't believe you lost like that");
            } else if (computerChoice === "paper" && userChoice === "scissors") {
                await interaction.reply("Nice job! You won!");
            } else if (computerChoice === "paper" && userChoice === "rock") {
                await interaction.reply("Dam...can't believe you lost like that");
            } else if (computerChoice === "scissors" && userChoice === "rock") {
                await interaction.reply("Nice job! You won!");
            } else if (computerChoice === "scissors" && userChoice === "paper") {
                await interaction.reply("Dam...can't believe you lost like that");
            } else {
                await interaction.reply("Dang we tied!");
            }
            await interaction.followUp(`I threw ${computerChoice} and you threw ${userChoice}`);
        } catch(err) {
            console.error(err);
        }
        
    }
}