module.exports = {
    productionSourceMap: false,
    publicPath: '/chatbot',
    outputDir: 'chatbot',
    pwa: {
        workboxOptions: {
            skipWaiting: true
        },
        name: 'Dialogflow Agent',
        themeColor: '#42a5f5'
    }
}