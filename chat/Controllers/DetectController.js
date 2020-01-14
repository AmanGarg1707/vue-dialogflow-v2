"use strict";

const config = require('../../config'),
    dialogflow = require('dialogflow'),
    value = require('pb-util');

let serviceAccount;

function detectIntent(sessionId, languageCode, query, response) {
    // Instantiate a DialogFlow client.
    const sessionClient = new dialogflow.SessionsClient({
        credentials: {
            private_key: serviceAccount.private_key,
            client_email: serviceAccount.client_email
        }
    });

    // Define session path
    const sessionPath = sessionClient.sessionPath(serviceAccount.project_id, sessionId);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    sessionClient
        .detectIntent(request)
        .then(responses => {
            response.status(200).json(responses[0]);
        })
        .catch(err => {
            response.status(500).json({
                error: err
            });
        });
};

exports.processRequest = function (request, response) {
    // if (config.Environment.Debug)
    //     console.log(request.query);
    serviceAccount = require('../../' + config.Dialogflow.agent);
    detectIntent(request.query.sessionId, request.query.langCode, request.query.query, response);
};