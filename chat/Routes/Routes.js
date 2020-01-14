"use strict";
const express = require('express');

let chatRoutes = express.Router(),
    detectController = require('../Controllers/DetectController');

chatRoutes.route('/detect').get(detectController.processRequest);
// chatRoutes.route('/context').get(detectController.processContext);
chatRoutes.route('/').get(function (req, res) {
    res.send("Hello from Chat express functions!")
});

module.exports = chatRoutes;