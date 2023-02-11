class PollButton {
    constructor() {
        this.data = {
            name: "poll"
        }
        this.votes = [];
    }

    async execute(interaction) {
        try {
            const split = interaction.customId.split("-");
            const clickedButton = split[1];
            const newVote = {
                id: `${interaction.user.id}-${interaction.message.id}`,
                button: clickedButton
            }
            const pollEmbed = interaction.message.embeds[0];
            const leftButtonField = pollEmbed.fields[0];
            const rightButtonField = pollEmbed.fields[1];
            if (!pollEmbed) {
                return await interaction.reply({
                    content: "Contact developer. Unable to find poll embed",
                    ephemeral: true
                });
            }
            if (this.votes.some(vote => vote.id === newVote.id)) {
                if (clickedButton === "left") {
                    console.log("LEFT");
                    console.log("left value: ", leftButtonField.value);
                    console.log("right value: ", rightButtonField.value);
                    if (parseInt(leftButtonField.value) === 1 && parseInt(rightButtonField.value) === 0) {
                        console.log("VOTED LEFT MORE THAN ONCE");
                        leftButtonField.value = 0;
                    } else if (parseInt(rightButtonField.value) === 1 && parseInt(leftButtonField.value) === 0) {
                        console.log("VOTED LEFT WHILE ALREADY VOTED RIGHT")
                        leftButtonField.value = 1;
                        rightButtonField.value = 0;
                    }
                } else if (clickedButton === "right"){
                    console.log("RIGHT");
                    console.log("left value: ", leftButtonField.value);
                    console.log("right value: ", rightButtonField.value);
                    if (parseInt(rightButtonField.value) === 1 && parseInt(leftButtonField.value) === 0) {
                        console.log("VOTED RIGHT MORE THAN ONCE");
                        rightButtonField.value = 0;
                    } else if (parseInt(leftButtonField.value) === 1 && parseInt(rightButtonField.value) === 0) {
                        console.log("VOTED RIGHT WHILE ALREADY VOTED LEFT");
                        rightButtonField.value = 1;
                        leftButtonField.value = 0;
                    }
                }
                const prevVoteIndex = this.votes.findIndex(vote => vote.id === newVote.id);
                this.votes.splice(prevVoteIndex, 1);
                this.votes.push({
                    id: `${interaction.user.id}-${interaction.message.id}`,
                    button: newVote.button === "left" ? "right" : "left"
                })
                await interaction.reply({ content: "Your vote has been removed", ephemeral: true});
                return await interaction.message.edit({embeds: [pollEmbed]});
            } else {
                this.votes.push(newVote);
                if (clickedButton === "left") {
                    console.log("VOTED LEFT FOR THE FIRST TIME");
                    leftButtonField.value = 1;
                } else if (clickedButton === "right") {
                    console.log("VOTED RIGHT FOR THE FIRST TIME");
                    rightButtonField.value = 1;
                }
                console.log("votes: ", this.votes);
                await interaction.reply({ content: "Your vote has been counted", ephemeral: true});
                return await interaction.message.edit({embeds: [pollEmbed]});
            }
        } catch(err) {
            console.error(err);
        }
    }
}
module.exports = new PollButton();