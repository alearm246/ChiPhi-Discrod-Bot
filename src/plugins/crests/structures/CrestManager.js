const knex = require("../../../db/db.js");

class CrestManager {
    constructor() {
        this.silverCrestCoolDown = 1000 * 60 * 2;
    }

    async addSilverCrest(reaction, user, ammount) {
        const { message, emoji } = reaction;
        await knex("user_message_reactions").insert({
            user_id: message.author.id,
            message_id: message.id,
            reaction_id: emoji.name
        })
        const prevSilverCrestPoints = await knex("users").where("id", message.author.id).select("silver_crest").first();
        await knex("users").where("id", message.author.id).update({
            silver_crest: prevSilverCrestPoints.silver_crest + ammount
        });
        await knex("users").where("id", user.id).update({
            last_silver_crest: knex.fn.now()
        })
    }

    async isSilverCrestCoolDownExpired(userId) {
        const sender = await knex("users").where("id", userId).select().first();
        const { last_silver_crest } = sender;
        if (last_silver_crest === null) {
            return true;
        }
        const diffInTime = Date.now() - new Date(last_silver_crest);
        return diffInTime >= this.silverCrestCoolDown;
    }

    async getRemainingTimeToSendSilverCrest(userId) {
        const sender = await knex("users").where("id", userId).select().first();
        return this.silverCrestCoolDown - (Date.now() - new Date(sender.last_silver_crest));
    }

    async hasUserGivenCrestToMessage(reaction, recieverId) {
        const { message, emoji } = reaction;
        const messageIdObjs = await knex("user_message_reactions").where("user_id", recieverId)
                                                                .andWhere("reaction_id", emoji.name)
                                                                .select("message_id");
        const messageIds = messageIdObjs.map(msgIdObj => msgIdObj.message_id);
        return messageIds.includes(message.id);
    }
}

module.exports = new CrestManager();