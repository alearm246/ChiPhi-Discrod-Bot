const { Events } = require("discord.js");
const knex = require("../../../db/db.js");
const crestManager = require("../structures/CrestManager.js");
const formatTime = require("../../../utils/formatTime.js");

module.exports = {
    name: Events.MessageReactionAdd,
    async execute(reaction, user) {
        const { message, emoji } = reaction;
        if (emoji.name === "😎" || emoji.name === "😏") {
            const typeOfCrest = crestManager.getTypeOfCrest(emoji.name);
            if (message.author.id === user.id) {
                message.channel.send("You cannot give yourself a crest");
                reaction.users.remove(user);
            } else {
                if (await crestManager.hasUserGivenCrestToMessage(reaction, message.author.id)) {
                    message.channel.send(`You have already given a ${typeOfCrest} to this message!`);
                } else {
                    if (await crestManager.isCrestCoolDownExpired(typeOfCrest, user.id)) {
                        await crestManager.addCrest(typeOfCrest, reaction, user, 1);
                    } else {
                        const ms = await crestManager.getRemaningTimeToSendCrest(typeOfCrest, user.id);
                        const timeRemaining = formatTime(ms);
                        message.channel.send(`You still have to wait  ${timeRemaining} to be able to give another ${typeOfCrest}`);
                        reaction.users.remove(user);
                    }
                } 
            }
        }
    }
}