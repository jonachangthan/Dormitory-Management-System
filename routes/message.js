const messageController = require('../controllers/message');
const token = require("../controllers/token.js");
const express = require('express');

const router = express.Router();
//* 撰寫
router.post('/write',token, messageController.write);

module.exports = router;