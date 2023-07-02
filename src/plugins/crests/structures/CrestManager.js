const knex = require("../../../db/db.js");

class CrestManager {
    constructor() {
        this.silverCrestCoolDown = 1000 * 60 * 2;
        this.goldCrestCoolDown = 1000 * 60 * 60 * 24;
    }

    async addCrest(typeOfCrest, reaction, user, ammount) {
        const { message, emoji } = reaction;
        await knex("user_message_reactions").insert({
            user_id: message.author.id,
            message_id: message.id,
            reaction_id: emoji.name
        })
        const prevCrests = await knex("users").where("id", message.author.id).select(typeOfCrest).first();
        await knex("users").where("id", message.author.id).update({
            [typeOfCrest]: prevCrests[typeOfCrest] + ammount
        });
        const lastCrestSent = "last_" + typeOfCrest
        await knex("users").where("id", user.id).update({
            [lastCrestSent]: knex.fn.now()
        })
    }

    async isCrestCoolDownExpired(typeOfCrest, userId) {
        const sender = await knex("users").where("id", userId).select().first();
        const lastCrestSent = "last_" + typeOfCrest;
        if (sender[lastCrestSent] === null) {
            return true;
        }
        const diffInTime = Date.now() - new Date(sender[lastCrestSent]);
        if (typeOfCrest === "silver_crest") {
            return diffInTime >= this.silverCrestCoolDown;
        } else {
            return diffInTime >= this.goldCrestCoolDown;
        }
    }

    async getRemaningTimeToSendCrest(typeOfCrest, userId) {
        const sender = await knex("users").where("id", userId).select().first();
        const lastCrestSent = "last_" + typeOfCrest;
        const elapsedTime = Date.now() - new Date(sender[lastCrestSent])
        if (typeOfCrest === "silver_crest") {
            return this.silverCrestCoolDown - elapsedTime;
        } else {
            return this.goldCrestCoolDown- elapsedTime;
        }
    }

    async hasUserGivenCrestToMessage(reaction, recieverId) {
        const { message, emoji } = reaction;
        const messageIdObjs = await knex("user_message_reactions").where("user_id", recieverId)
                                                                .andWhere("reaction_id", emoji.name)
                                                                .select("message_id");
        const messageIds = messageIdObjs.map(msgIdObj => msgIdObj.message_id);
        return messageIds.includes(message.id);
    }

    getTypeOfCrest(emoji) {
        if (emoji === "😎") {
            return "silver_crest";
        } else if (emoji === "😏") {
            return "golden_crest";
        }
    }
}

module.exports = new CrestManager();