module.exports = {
    Environment: {
        Debug: false,
        Port: 1707
    },
    Dialogflow: {
        agent: 'agent1707'
    },
    app: {
        muted: true, // <- mute microphone by default
        googleIt: false, // <- ask users to google their request, in case of input.unknown action
        dialogflowUrl: 'http://localhost:1707/chat'
    },
    locale: {
        strings: {
            welcomeTitle: "Chat with me",
            author: "Aman1707",
            queryTitle: "Ask me something ...",
            voiceTitle: "Go ahead, im listening...",
        },
        settings: {
            speechLang: "en-GB", // <- output language
            recognitionLang: "en-US" // <- input(recognition) language
        }
    }
};