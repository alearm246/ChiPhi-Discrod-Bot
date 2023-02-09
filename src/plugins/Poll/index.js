module.exports = {
    name: "Poll",
    commands: [
        require("./commands/poll.js"),
    ],
    components: {
        buttons: [
            require("./components/poll-button.js")
        ]
    }
};
