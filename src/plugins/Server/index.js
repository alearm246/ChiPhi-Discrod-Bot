module.exports = {
    name: "Server",
    commands: [
        require("./commands/server-info.js"),
        require("./commands/seed.js")
    ],
    components: {
        buttons: [
        ]
    }
};
