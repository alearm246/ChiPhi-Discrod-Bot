const { Events } = require("discord.js");
const crestsOnReactionAdd = require("../plugins/crests/events/crestsOnReactionAdd.js");
require("dotenv").config();

module.exports = {
	name: Events.MessageReactionAdd,
	async execute(messageReaction, user) {
        crestsOnReactionAdd.execute(messageReaction, user);
	},
};