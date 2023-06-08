const supervisorToMessageController = require('../controllers/supervisorToMessage');
const token = require("../controllers/token.js");
const express = require('express');

const router = express.Router();

router.post('/writeBulletin',token, supervisorToMessageController.writeBulletin);

router.post('/writeMessage',token, supervisorToMessageController.writeMessage);

router.post('/delete',token, supervisorToMessageController.delete);

router.post('/modify',token, supervisorToMessageController.modify);

module.exports = router;