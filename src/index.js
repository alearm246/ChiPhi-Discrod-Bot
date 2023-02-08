require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Collection } = require("discord.js");

const PREFIX = ".";

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent] });

client.commands = new Collection();

client.on("ready", () => {
    console.log("Bot is online!");
    client.user.setActivity("Watching Server", { type: "WATCHING" });
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    const validGreetings = ["hello", "hi", "yo", "wassup"];
    if (validGreetings.includes(message.content.toLowerCase().replace(/\s/g,''))) {
        message.reply("hello");
    }
})



client.login(process.env.TOKEN);