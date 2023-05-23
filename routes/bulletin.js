const bulletinController = require('../controllers/bulletin');
const token = require("../controllers/token.js");
const express = require('express');

const router = express.Router();
//* 撰寫
router.post('/write',token, bulletinController.write);

module.exports = router;