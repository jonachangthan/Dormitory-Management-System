const bulletinController = require('../controllers/bulletin');
const token = require("../controllers/token.js");
const express = require('express');

const router = express.Router();
//* 撰寫
router.post('/write',token, bulletinController.write);

router.post('/delete',token, bulletinController.delete);

router.post('/modify',token, bulletinController.modify);

module.exports = router;