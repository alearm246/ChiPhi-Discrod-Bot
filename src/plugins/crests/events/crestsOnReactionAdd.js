const { Events } = require("discord.js");
const knex = require("../../../db/db.js");

module.exports = {
    name: Events.MessageReactionAdd,
    async execute(reaction, user) {
        const { message, emoji } = reaction;
        if (emoji.name === "😎") {
            if (message.author.id === user.id) {
                message.channel.send("You cannot give yourself a crest");
                reaction.users.remove(user);
            } else {
                const message_ids = await knex("user_message_reactions").where("user_id", message.author.id)
                                                                      .andWhere("reaction_id", emoji.name)
                                                                      .select("message_id");
                const messageIds = message_ids.map(message => message.message_id);
                const sender = await knex("users").where("id", user.id).select().first();
                const { last_silver_crest } = sender;
                const diffInTime = Date.now() - new Date(last_silver_crest);
                const silverCrestCoolDown = 1000 * 60 * 2;
                if (messageIds.includes(message.id)) {
                    message.channel.send("You have already given a silver crest to this message!");
                } else {
                    if (diffInTime >= silverCrestCoolDown) {
                        await knex("user_message_reactions").insert({
                            user_id: message.author.id,
                            message_id: message.id,
                            reaction_id: emoji.name
                        })
                        const prevSilverCrestPoints = await knex("users").where("id", message.author.id).select("silver_crest").first();
                        console.log("prev silver crest points: ", prevSilverCrestPoints);
                        await knex("users").where("id", message.author.id).update({
                            silver_crest: prevSilverCrestPoints.silver_crest + 1
                        });
                        await knex("users").where("id", user.id).update({
                            last_silver_crest: knex.fn.now()
                        })
                    } else {
                        const seconds = (silverCrestCoolDown - diffInTime) / 1000;
                        message.channel.send(`You still have to wait ${seconds} seconds to be able to give another silver crest`);
                        reaction.users.remove(user);
                    }
                } 
            }
        }
    }
}